import React, { memo, useCallback, useEffect, useState } from "react";
import { HeaderHome } from "@/componens/Header/DynamicHeader";
import { ScreenWrapper } from "@/common/CommonStyles";
import { IMG_TARGET_HOME_THEME } from "@/assets";
import { styled, useAsyncFn } from "@/global";
import RadarChartHome from "@/screens/Home/components/RadarChartHome";
import { RefreshControl, ScrollView, View } from "react-native";
import { requestConnectMachineHitMode } from "@/store/mechine/function";
import MachineIdService from "@/services/MachineIdService";
import PunchComponent from "@/screens/Home/components/PunchComponent";
import PowerComponent from "@/screens/Home/components/PowerComponent";
import {
  RawDataGoal,
  RawDataStrengthGoal,
  requestHitGoal,
  requestStrengthGoal,
} from "@/store/home/function";
import { Colors } from "@/themes/Colors";
import GradientButton from "@/componens/Gradient/ButtonGradient";

export const HomeScreen = memo(function HomeScreen({ navigation }: any) {
  const [dataHit, setDataHit] = useState<RawDataGoal>({
    goal: 0,
    total_hit: 0,
  });
  const [dataStrength, setDataStrength] = useState<RawDataStrengthGoal>({
    strength: 0,
    strength_goal: 0,
    list_point: [],
  });
  const onPractice = useCallback(async () => {
    const machineId = MachineIdService.getMachineId();
    await requestConnectMachineHitMode(machineId, "5");
  }, []);

  const [{ loading }, onLoadData] = useAsyncFn(async () => {
    const dataHit = await requestHitGoal();
    const dataStrength = await requestStrengthGoal();
    setDataHit(dataHit);
    setDataStrength(dataStrength);
  }, []);

  useEffect(() => {
    onLoadData().then();
  }, []);

  return (
    <ScreenWrapper>
      <HeaderHome title={"Home"} toggleDrawer={navigation.toggleDrawer} />
      <ScrollView
        refreshControl={
          <RefreshControl
            progressBackgroundColor={Colors.colorText}
            tintColor={Colors.colorText}
            refreshing={loading}
            onRefresh={onLoadData}
          />
        }
      >
        <View style={{ flexDirection: "row" }}>
          <SImageBackground
            resizeMode={"contain"}
            source={IMG_TARGET_HOME_THEME}
          />
          <View style={{ flex: 1 }}>
            <RadarChartHome />
          </View>
          <SBaseOpacityButton>
            <GradientButton label={"Tập luyện"} onPress={onPractice} />
          </SBaseOpacityButton>
        </View>

        <PunchComponent dataHit={dataHit} />
        <PowerComponent dataStrength={dataStrength} />
      </ScrollView>
    </ScreenWrapper>
  );
});

export default HomeScreen;

const SImageBackground = styled.Image`
  height: 180px;
  width: 100%;
  position: absolute;
`;

const SBaseOpacityButton = styled.View`
  padding: 0 16px;
  align-self: center;
`;
