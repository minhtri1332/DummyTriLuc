import React, {memo} from "react";
import {HeaderHome} from "@/componens/Header/DynamicHeader";
import {ScreenWrapper} from "@/common/CommonStyles";
import SectionContainerStyle from "@/componens/View/SectionView";
import {IC_CHART} from "@/assets";
import BaseProgressView from "@/componens/View/BaseProgressView";
import {Colors} from "@/themes/Colors";
import {styled} from "@/global";
import RadarChartHome from "@/screens/Home/components/RadarChartHome";

export const HomeScreen = memo(function HomeScreen({ navigation }: any) {

  return (
    <ScreenWrapper>
      <HeaderHome title={"Home"} toggleDrawer={navigation.toggleDrawer} />

      <SectionContainerStyle title={""}>
        <RadarChartHome />
      </SectionContainerStyle>

      <SectionContainerStyle title={"Thông tin"} iconRight={IC_CHART}>
        <Progress
          progress={0.1}
          hightLightColor={Colors.blue1}
          barColor={Colors.orange1}
        />
      </SectionContainerStyle>
      <SectionContainerStyle title={"Thông tin"} iconRight={IC_CHART}>
        <Progress
          progress={0.1}
          hightLightColor={Colors.blue1}
          barColor={Colors.orange1}
        />
        <SViewContent></SViewContent>
      </SectionContainerStyle>
    </ScreenWrapper>
  );
});

export default HomeScreen;

const Progress = styled(BaseProgressView)`
  height: 10px;
  margin: 0 16px;
`;

const SViewContent = styled.View`
  background-color: coral;
`;
