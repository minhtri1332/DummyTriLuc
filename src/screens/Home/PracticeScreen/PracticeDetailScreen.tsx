import React, { memo, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { ScreenWrapper } from "@/common/CommonStyles";
import { useAsyncFn } from "@/hooks";
import { requestPracticeDetail } from "@/store/home/function";
import { useNavigationParams } from "@/hooks/useNavigationParams";
import { styled } from "@/global";
import { IMG_BACKGROUND_MACHINE, VIDEO } from "@/assets";
import PointHitComponent from "@/screens/Practice/PointHitComponent";
import _ from "lodash";
import moment from "moment";
import TimeStartPractice from "@/screens/Home/PracticeScreen/TimeStartPractice";
import { Colors } from "@/themes/Colors";
import ButtonGradient from "@/componens/Gradient/ButtonGradient";
import VideoPlayer from "react-native-video-player";

export interface PracticeDetailProps {
  practiceId: string;
  data?: any;
}

const dataMap = (dataHit: any, start: number) => {
  return _.keyBy(dataHit, function (o) {
    return moment(start + o.t).format("HH:mm:ss");
  });
};

export const PracticeDetailScreen = memo(function PracticeDetailScreen() {
  const { practiceId, data } = useNavigationParams<PracticeDetailProps>();
  const start = data.start_time1 * 1000 + data.start_time2;
  const [practice, setPractice] = useState(data);
  const [replay, setReplay] = useState(false);
  const dataMapTime = dataMap(data.data || practice?.practice?.data, start);
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
          onPlayPress={() => setReplay(!replay)}
          thumbnail={{ uri: "https://i.picsum.photos/id/866/1600/900.jpg" }}
        />
        {/*<Video*/}
        {/*  source={VIDEO} // Can be a URL or a local file.*/}
        {/*  style={styles.backgroundVideo}*/}
        {/*/>*/}
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

const SText = styled.Text`
  justify-content: center;
  align-self: center;
  color: ${Colors.colorText};
  font-size: 30px;
  margin-top: 20px;
`;

const SViewButton = styled.View`
  margin: 16px;
`;

const SImageBackground = styled.Image`
  height: 400px;
  width: 100%;
`;
