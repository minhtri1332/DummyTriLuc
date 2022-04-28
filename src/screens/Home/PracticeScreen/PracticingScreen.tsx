import React, { memo } from "react";
import { ScreenWrapper } from "@/common/CommonStyles";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import TimeStartPractice from "@/screens/Home/PracticeScreen/TimeStartPractice";
import { styled } from "@/global";
import { Colors } from "@/themes/Colors";

export interface PracticingScreenProps {}

export const PracticingScreen = memo(function PracticingScreen() {
  return (
    <ScreenWrapper>
      <DynamicHeader title={"Tập luyện"} />

      <SText>
        <TimeStartPractice stopTime={0} />
      </SText>
    </ScreenWrapper>
  );
});

const SText = styled.Text`
  justify-content: center;
  align-self: center;
  color: ${Colors.colorText};
  font-size: 30px;
  margin-top: 20px;
`;

export default PracticingScreen;
