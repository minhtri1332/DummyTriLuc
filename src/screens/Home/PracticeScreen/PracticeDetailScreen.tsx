import React, { memo, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { ScreenWrapper } from "@/common/CommonStyles";
import { useAsyncFn } from "@/hooks";
import { requestPracticeDetail } from "@/store/home/function";
import { useNavigationParams } from "@/hooks/useNavigationParams";
import { usePractice } from "@/store/home";
import { styled } from "@/global";
import { IMG_BACKGROUND_MACHINE } from "@/assets";
import { Colors } from "@/themes/Colors";
import PointHitComponent from "@/screens/Practice/PointHitComponent";
import _ from "lodash";
import moment from "moment";

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

  console.log("practice", practice);
  return (
    <ScreenWrapper>
      <DynamicHeader title={"PracticeDetailScreen"} />

      <View style={{ height: 500 }}>
        <SImageBackground
          resizeMode={"cover"}
          source={IMG_BACKGROUND_MACHINE}
        />
        <PointHitComponent
          practice={practice.practice}
          dataMapTime={dataMapTime}
        />
        {/*<SViewContainerHitPoint>*/}
        {/*  <ItemHitPoint point={11} />*/}
        {/*  <SViewHitPointLeftRight>*/}
        {/*    <ItemHitPoint point={11} position={"left"} />*/}
        {/*    <ItemHitPoint point={11} />*/}
        {/*  </SViewHitPointLeftRight>*/}
        {/*  <ItemHitPoint point={11} />*/}
        {/*</SViewContainerHitPoint>*/}
      </View>
    </ScreenWrapper>
  );
});

export default PracticeDetailScreen;

const SViewHitPoint = styled.View<{ isHighLight: boolean }>`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isHighLight ? Colors.orange1 : Colors.white};
  border-color: darkred;
  border-width: 2px;
`;

const SViewHitPointLeft = styled(SViewHitPoint)<{ isHighLight: boolean }>`
  margin-right: 100px;
`;

const SImageBackground = styled.Image`
  flex: 1;
  width: 100%;
`;
