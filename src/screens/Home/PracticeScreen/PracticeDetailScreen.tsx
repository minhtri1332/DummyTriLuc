import React, { memo, useEffect } from "react";
import { Text, View } from "react-native";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { ScreenWrapper } from "@/common/CommonStyles";
import { useAsyncFn } from "@/hooks";
import { requestPracticeDetail } from "@/store/home/function";
import { useNavigationParams } from "@/hooks/useNavigationParams";
import { usePractice } from "@/store/home";
import { styled } from "@/global";
import { IMG_BACKGROUND_MACHINE } from "@/assets";
import PointHitComponent from "@/screens/Practice/PointHitComponent";
import _ from "lodash";
import moment from "moment";
import TimeStartPractice from "@/screens/Home/PracticeScreen/TimeStartPractice";
import { Colors } from "@/themes/Colors";

export interface PracticeDetailProps {
  practiceId: string;
}

const dataMap = (dataHit: any) => {
  return _.keyBy(dataHit || [], function (o) {
    return String(moment(o.t).format("HH:mm:ss"));
  });
};

export const PracticeDetailScreen = memo(function PracticeDetailScreen() {
  const { practiceId } = useNavigationParams<PracticeDetailProps>();
  const practice = usePractice(practiceId);
  const dataMapTime = dataMap(practice?.practice?.data);
  const [{ loading }, getData] = useAsyncFn(async () => {
    await requestPracticeDetail(practiceId);
  }, [practiceId]);

  useEffect(() => {
    getData().then();
  }, []);

  return (
    <ScreenWrapper>
      <DynamicHeader title={"PracticeDetailScreen"} />

      <View style={{ height: 500 }}>
        <SImageBackground
          resizeMode={"cover"}
          source={IMG_BACKGROUND_MACHINE}
        />
        <PointHitComponent
          practice={practice?.practice}
          dataMapTime={dataMapTime}
        />
      </View>
      <SText>
        <TimeStartPractice stopTime={practice?.practice.end_time} />
      </SText>
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

const SImageBackground = styled.Image`
  flex: 1;
  width: 100%;
`;
