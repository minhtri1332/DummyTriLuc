import React, {memo, useCallback} from "react";
import {HeaderHome} from "@/componens/Header/DynamicHeader";
import {ScreenWrapper} from "@/common/CommonStyles";
import SectionContainerStyle from "@/componens/View/SectionView";
import {IC_CHART} from "@/assets";
import BaseProgressView from "@/componens/View/BaseProgressView";
import {Colors} from "@/themes/Colors";
import {styled} from "@/global";
import RadarChartHome from "@/screens/Home/components/RadarChartHome";
import {Text, View} from "react-native";
import {BaseOpacityButton} from "@/componens/Button/ButtonCustom";
import {requestConnectMachineHitMode} from "@/store/mechine/function";
import MachineIdService from "@/services/MachineIdService";

export const HomeScreen = memo(function HomeScreen({ navigation }: any) {

    const onPractice = useCallback(
        async () => {
            const machineId = await MachineIdService.getMachineId()
           await requestConnectMachineHitMode(machineId, '5')
        },
        [],
    );

  return (
    <ScreenWrapper>
      <HeaderHome title={"Home"} toggleDrawer={navigation.toggleDrawer} />

      <SectionContainerStyle title={""}>
       <View style={{flexDirection:'row'}}>
          <View style={{flex:1}}>
              <RadarChartHome />
          </View>
           <SBaseOpacityButton onPress={onPractice}>
               <Text>Tập luyện</Text>
           </SBaseOpacityButton>
       </View>
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

const SBaseOpacityButton = styled.TouchableOpacity`
  height: 32px;
  padding: 0 16px;
  margin-right: 32px;
  background-color: coral;
  align-self: center;
  justify-content: center;
  border-radius: 4px;
`;

const Progress = styled(BaseProgressView)`
  height: 10px;
  margin: 0 16px;
`;

const SViewContent = styled.View`
  background-color: coral;
`;
