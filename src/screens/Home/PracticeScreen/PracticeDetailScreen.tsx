import React, { memo, useEffect, useState } from "react";
import { View } from "react-native";
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

export interface PracticeDetailProps {
  practiceId: string;
  data?: any;
}

const dataMap = (dataHit: any) => {
  return _.keyBy(dataHit, function (o) {
    const key = o.t.split(".");
    // return key[0] + "." + key[1].slice(0, 1);
    return key[0];
  });
};

export const PracticeDetailScreen = memo(function PracticeDetailScreen() {
  const { practiceId, data } = useNavigationParams<PracticeDetailProps>();
  const [practice, setPractice] = useState(data);
  const [replay, setReplay] = useState(false);
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

  return (
    <ScreenWrapper>
      <DynamicHeader title={"Bài tập"} />

      <View>
        <VideoPlayer
          autoplay={true}
          video={VIDEO}
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
          onLoadStart={() => {
            console.log("ok1");
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
