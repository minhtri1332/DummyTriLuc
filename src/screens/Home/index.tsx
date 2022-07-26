import React, { memo, useCallback, useEffect, useState } from "react";
import { HeaderHome } from "@/componens/Header/DynamicHeader";
import { ScreenWrapper } from "@/common/CommonStyles";
import { IMG_TARGET_HOME_THEME } from "@/assets";
import { styled, useAsyncFn, useBoolean } from "@/global";
import RadarChartHome from "@/screens/Home/components/RadarChartHome";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import PunchComponent from "@/screens/Home/HitScreen/PunchComponent";
import PowerComponent from "@/screens/Home/StrengthScreen/PowerComponent";
import {
  RawDataGoal,
  RawDataStrengthGoal,
  requestHitGoal,
  requestStrengthGoal,
} from "@/store/home/function";
import { Colors } from "@/themes/Colors";
import GradientButton from "@/componens/Gradient/ButtonGradient";
import PracticingBottomModal from "@/screens/Home/PracticingBottomModal/PracticingBottomModal";
import PracticeComponent from "@/screens/Home/PracticeScreen/PracticeComponent";
import useAutoToastError from "@/hooks/useAutoToastError";
import { requestGetProfile } from "@/store/profile/functions";
import LocalStorageHelper from "@/services/LocalServiceHelper";
import MachineIdService from "@/services/MachineIdService";
import RatingsComponent from "@/screens/Home/RatingsScreen/RatingsComponent";
import { Fonts } from "@/assets/fonts";
import { useProfile } from "@/store/profile";
import { commonStyles, TransitionContextView } from "@/ultils/transitions";
import Avatar from "@/componens/View/Avatar";

export const HomeScreen = memo(function HomeScreen({ navigation }: any) {
  const profile = useProfile("0");

  const [listMachineId, setListMachineId] = useState("");
  const [isModalPracticeVisible, showModalPractice, hideModalPractice] =
    useBoolean();
  const [stat, setStat] = useState();
  const [dataHit, setDataHit] = useState<RawDataGoal>({
    goal: 0,
    total_hits: 0,
  });
  const [dataStrength, setDataStrength] = useState<RawDataStrengthGoal>({
    strength: 0,
    strength_goal: 0,
    list_point: [],
  });

  const [{ loading }, onLoadData] = useAsyncFn(async () => {
    await onLoadHit();
    await onLoadStrength();
    await onLoadProfile();
  }, []);

  const [{}, onLoadHit] = useAsyncFn(async () => {
    const dataHit = await requestHitGoal();
    setDataHit(dataHit);
  }, []);

  const [{}, onLoadStrength] = useAsyncFn(async () => {
    const dataStrength = await requestStrengthGoal();
    setDataStrength(dataStrength);
  }, []);

  const [{ loading: l, error }, onLoadProfile] = useAsyncFn(async () => {
    const profile = await requestGetProfile();
    setStat(profile.stat);
  }, []);

  const getDataMachine = useCallback(async () => {
    LocalStorageHelper.get("machine").then((item) => {
      // const dataLocal = (item || "").split(",");
      // setListMachineId(dataLocal || []);
      MachineIdService.change(item || "");
    });
  }, []);

  useAutoToastError(error);

  useEffect(() => {
    onLoadData().then();
    getDataMachine().then();
  }, []);

  return (
    <ScreenWrapper>
      <HeaderHome title={"Home"} toggleDrawer={navigation.toggleDrawer} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={Colors.colorText}
            tintColor={Colors.colorText}
            refreshing={loading}
            onRefresh={onLoadData}
          />
        }
      >
        <TransitionContextView
          style={commonStyles.expand}
          transitionKey={"RequestDetail"}
        >
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <SImageBackground
              resizeMode={"cover"}
              source={IMG_TARGET_HOME_THEME}
            />
            <View style={{ flex: 1 }}>
              {stat && <RadarChartHome stat={stat} />}
            </View>
            <SBaseViewPractice>
              <SViewAvatar>
                <Avatar size={50} uri={profile?.avatar} />
                <STextName ellipsizeMode={"tail"} numberOfLines={1}>
                  {profile?.name}
                </STextName>
              </SViewAvatar>
              <SGradientButton
                label={"Tập luyện"}
                onPress={showModalPractice}
              />
            </SBaseViewPractice>
          </View>

          <PunchComponent dataHit={dataHit} />
          <PowerComponent dataStrength={dataStrength} />
          <RatingsComponent />

          <PracticeComponent />
        </TransitionContextView>
      </ScrollView>
      <PracticingBottomModal
        isVisible={isModalPracticeVisible}
        hideMenu={hideModalPractice}
        listMachineId={listMachineId}
      />
    </ScreenWrapper>
  );
});

export default HomeScreen;

const SImageBackground = styled.Image`
  height: 190px;
  width: 100%;
  position: absolute;
`;

const SGradientButton = styled(GradientButton)`
  margin: 0 16px;
`;

const SBaseViewPractice = styled.View`
  justify-content: center;
  flex: 1;
`;

const SViewAvatar = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 16px 0;
`;

const STextName = styled.Text`
  color: ${Colors.colorText};
  font-size: 18px;
  font-family: ${Fonts.anton};
  margin-top: 14px;
  margin-left: 16px;
  max-width: 120px;
`;
