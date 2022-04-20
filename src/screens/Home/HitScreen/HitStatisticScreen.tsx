import React, { memo, useCallback, useState } from "react";
import { ScreenWrapper } from "@/common/CommonStyles";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { styled, useBoolean } from "@/global";
import { Colors } from "@/themes/Colors";
import moment from "moment";
import GradientButton from "@/componens/Gradient/ButtonGradient";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { requestHitsStatistic } from "@/store/home/function";
import BarChartComponent from "@/screens/Home/HitScreen/BarChartComponent";
import GradientText from "@/componens/Gradient/TextGradient";

export interface paramFilterHit {
  dateStart: number;
  dateEnd: number;
  statisticType: "byWeek" | "byMonth" | "byYear";
}

export const HitStatisticScreen = memo(function HitStatisticScreen() {
  const [isModalVisible, showModal, hideModal] = useBoolean();
  const [paramFilter, setParamFilter] = useState<paramFilterHit>({
    statisticType: "byYear",
    // dateStart: moment(new Date().setHours(0, 0, 0, 0)).startOf("year").unix(),
    // dateEnd: moment(new Date(), "X").endOf("year").unix(),
    dateStart: 1640995200,
    dateEnd: 1672531199,
  });

  const setParamCustom = useCallback(
    (keyName: string, value: string) => {
      setParamFilter({ ...paramFilter, [keyName]: value });
    },
    [paramFilter]
  );

  const onConfirm = useCallback(
    async (date: Date) => {
      hideModal();
      const hitStatic = await requestHitsStatistic(paramFilter);
      console.log("hitStatic", hitStatic, paramFilter);
      //setState(date);
      // requestAnimationFrame(() => {
      //     onChange?.(moment(date).unix());
      // });
    },
    [paramFilter]
  );

  return (
    <ScreenWrapper>
      <DynamicHeader title={"Thống kê"} />
      <SViewButtonGroup>
        <SButtonTab
          label={"Tuần"}
          keyName={"statisticType"}
          value={"byWeek"}
          styleGradient={{ borderRadius: 0 }}
          onPress={setParamCustom}
          offGradient={paramFilter.statisticType !== "byWeek"}
        />
        <SButtonTab
          label={"Tháng"}
          keyName={"statisticType"}
          value={"byMonth"}
          styleGradient={{ borderRadius: 0 }}
          onPress={setParamCustom}
          offGradient={paramFilter.statisticType !== "byMonth"}
        />
        <SButtonTab
          label={"Năm"}
          keyName={"statisticType"}
          value={"byYear"}
          styleGradient={{ borderRadius: 0 }}
          onPress={setParamCustom}
          offGradient={paramFilter.statisticType !== "byYear"}
        />
      </SViewButtonGroup>

      <SViewPickTime>
        <DateTimePickerModal
          mode={"date"}
          onConfirm={onConfirm}
          isVisible={isModalVisible}
          onCancel={hideModal}
        >
          <STextDate>{paramFilter.dateStart || "asd"}</STextDate>
        </DateTimePickerModal>
        <STextDate onPress={showModal}>
          {moment(paramFilter.dateStart, "X").format("yyyy")}
        </STextDate>
      </SViewPickTime>

      <BarChartComponent />
      <SViewTextHit>
        <STextGradient>1000 </STextGradient>
        <SText>đòn đánh</SText>
      </SViewTextHit>
    </ScreenWrapper>
  );
});

const SViewTextHit = styled.View`
  align-self: center;
  margin-top: 50px;
  flex-direction: row;
`;

const SText = styled.Text`
  color: ${Colors.colorText};
  font-size: 30px;
  font-family: Roboto-Medium;
`;

const STextGradient = styled(GradientText)`
  color: ${Colors.colorText};
  font-size: 30px;
  font-family: Roboto-Medium;
`;

const SButtonTab = styled(GradientButton)`
  flex: 1;
  border-right-width: 1px;
  border-color: ${Colors.grey3};
  border-radius: 0px;
`;

const STextDate = styled.Text`
  align-self: center;
  color: ${Colors.colorText};
`;

const SViewPickTime = styled.TouchableOpacity``;

const SViewButtonGroup = styled.View`
  height: 34px;
  margin: 16px;
  border-width: 1px;
  border-color: ${Colors.grey3};
  flex-direction: row;
`;

export default HitStatisticScreen;
