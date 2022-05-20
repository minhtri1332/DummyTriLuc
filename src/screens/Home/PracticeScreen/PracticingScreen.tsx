import React, { memo } from "react";
import { ScreenWrapper } from "@/common/CommonStyles";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import TimeStartPractice from "@/screens/Home/PracticeScreen/TimeStartPractice";
import { styled, useAsyncFn } from "@/global";
import { Colors } from "@/themes/Colors";
import GradientButton from "@/componens/Gradient/ButtonGradient";
import { goBack } from "@/ultils/navigation";
import MachineIdService from "@/services/MachineIdService";
import { requestConnectMachineHitMode } from "@/store/mechine/function";

export interface PracticingScreenProps {}

export const PracticingScreen = memo(function PracticingScreen() {
  const [{ loading }, endPracticing] = useAsyncFn(async () => {
    const machineId = MachineIdService.getMachineId();
    await requestConnectMachineHitMode(machineId, "-1");
    goBack();
  }, []);

  return (
    <ScreenWrapper>
      <DynamicHeader title={"Tập luyện"} />

      <SText>
        <TimeStartPractice stopTime={450000000} />
      </SText>

      <SButtonPractice>
        <GradientButton
          loading={loading}
          label={"Kết thức tập luyện"}
          onPress={endPracticing}
        />
      </SButtonPractice>
    </ScreenWrapper>
  );
});

const SButtonPractice = styled.View`
  flex: 1;
  margin: 16px;
`;

const SText = styled.Text`
  justify-content: center;
  align-self: center;
  color: ${Colors.colorText};
  font-size: 30px;
  margin-top: 20px;
`;

export default PracticingScreen;
