import React, { memo, useCallback, useEffect, useRef, useState } from "react";
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
import { sleep } from "@/ultils/sleep";
import RNFS from "react-native-fs";

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
    if (practiceId === "") {
      setReplay(!replay);
      return;
    }

    getData().then();

    return () => {
      currentVideoLocal &&
        currentVideoLocal.videoUrl &&
        RNFS.unlink(currentVideoLocal?.videoUrl)
          .then(() => {})
          .catch((err) => {
            console.log(err.message);
          });
    };
  }, [practiceId]);

  const onStartHit = useCallback(async () => {
    if (video_ref.current) {
      const time = VideoUrlServiceClass.getTimeStart();
      const timeCamera = moment(time);
      const timeMachine = moment(start_time);
      const sleep_time =
        Number(timeCamera?.diff(timeMachine, "milliseconds")) + 1000 || 1000;
      // ToastService.showDuration(`Chờ ${timeDiff || 0} milliseconds`, 150);
      await sleep(0);
      video_ref.current.pause();
      await sleep(Number(sleep_time));
      video_ref.current.resume();
      ToastService.show(`Start`);
    }
  }, [video_ref?.current]);

  useEffect(() => {
    if (video_ref?.current && start_time && currentVideoLocal) {
      onStartHit().then();

      setReplay(false);
      setRestart(false);
    }
  }, [video_ref?.current]);

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
              onStartHit().then();
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
    </ScreenWrapper>
  );
});

export default PracticeDetailScreen;

const SImageBackground = styled.Image`
  height: 400px;
  width: 100%;
`;
