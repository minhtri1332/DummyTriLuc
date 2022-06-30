import React, { memo, useEffect, useRef, useState } from "react";
import { InteractionManager, View } from "react-native";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { ScreenWrapper } from "@/common/CommonStyles";
import { useAsyncFn } from "@/hooks";
import { requestPracticeDetail } from "@/store/home/function";
import { useNavigationParams } from "@/hooks/useNavigationParams";
import { styled } from "@/global";
import { IMG_BACKGROUND_MACHINE, VIDEO } from "@/assets";
import PointHitComponent from "@/screens/Practice/PointHitComponent";
import _ from "lodash";
import VideoPlayer from "react-native-video-player";
import moment from "moment";
import VideoUrlServiceClass from "@/services/VideoUrlClass";
import { useInteractionManager } from "@react-native-community/hooks";
import ToastService from "@/services/ToastService";

export interface PracticeDetailProps {
  practiceId: string;
  start_time?: number;
  data?: any;
  currentVideoLocal?: { videoUrl: string; thumbnail: string };
}

const dataMap = (dataHit: any) => {
  return _.keyBy(dataHit, function (o) {
    const key = o.t.split(".");
    // return key[0] + "." + key[1].slice(0, 1);
    return key[0];
  });
};

export const PracticeDetailScreen = memo(function PracticeDetailScreen() {
  const { practiceId, start_time, data, currentVideoLocal } =
    useNavigationParams<PracticeDetailProps>();
  const video_ref = useRef<VideoPlayer>(null);
  const [practice, setPractice] = useState(data);
  const [replay, setReplay] = useState(start_time ? true : false);
  const [restart, setRestart] = useState(false);
  const dataMapTime = dataMap(data.data || practice?.practice?.data);

  const [{ loading }, getData] = useAsyncFn(async () => {
    const value = await requestPracticeDetail(practiceId);
    setPractice(value);
  }, [practiceId, data]);

  useEffect(() => {
    if (practiceId === "") return;

    getData().then();
  }, [practiceId]);

  useEffect(() => {
    if (start_time && currentVideoLocal) {
      const time = VideoUrlServiceClass.getTimeStart();
      const timeCamera = moment(time);
      const timeMachine = moment(start_time);
      const sleep_time =
        timeCamera?.diff(timeMachine, "milliseconds") + 300 || 300;
      ToastService.show(`Chạy bài tập sau ${sleep_time || 0} milliseconds`);
      setTimeout(() => {
        setReplay(false);
      }, sleep_time);
    }
  }, [start_time, currentVideoLocal]);

  return (
    <ScreenWrapper>
      <DynamicHeader title={"Bài tập"} />
      <>
        <View>
          <VideoPlayer
            ref={video_ref}
            autoplay={true}
            video={
              currentVideoLocal ? { uri: currentVideoLocal.videoUrl } : VIDEO
            }
            videoWidth={1600}
            videoHeight={1000}
            showDuration={true}
            disableSeek={true}
            onPlayPress={() => {
              setReplay(!replay);
              setRestart(false);
            }}
            onEnd={() => {
              setReplay(true);
              setRestart(true);
            }}
            thumbnail={{ uri: "https://i.picsum.photos/id/866/1600/900.jpg" }}
          />
        </View>

        <View>
          <SImageBackground
            resizeMode={"cover"}
            source={IMG_BACKGROUND_MACHINE}
          />
          <PointHitComponent
            practice={data || practice?.practice}
            dataMapTime={dataMapTime}
            replay={replay}
            restart={restart}
          />
        </View>
      </>

      {/*<SText>*/}
      {/*  <TimeStartPractice*/}
      {/*    stopTime={data?.end_time || practice?.practice?.end_time}*/}
      {/*    replay={replay}*/}
      {/*    onReplay={setReplay}*/}
      {/*  />*/}
      {/*</SText>*/}

      {/*<SViewButton>*/}
      {/*  <ButtonGradient onPress={() => setReplay(!replay)} label={"Xem lại"} />*/}
      {/*</SViewButton>*/}
    </ScreenWrapper>
  );
});

export default PracticeDetailScreen;

const SImageBackground = styled.Image`
  height: 400px;
  width: 100%;
`;
