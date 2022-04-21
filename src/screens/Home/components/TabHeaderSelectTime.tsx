import React, { memo, useCallback, useMemo } from "react";
import SectionContainerStyle from "@/componens/View/SectionView";
import { IC_CHART, IC_POWER } from "@/assets";
import { Colors } from "@/themes/Colors";
import { styled, useBoolean } from "@/global";
import BaseProgressView from "@/componens/View/BaseProgressView";
import PieChartHome from "@/screens/Home/components/PieChartHome";
import {
  RawDataStrengthGoal,
  requestHitsStatistic,
} from "@/store/home/function";
import {
  navigateToHitStatisticScreen,
  navigateToStrengthStatisticScreen,
} from "@/ultils/navigation";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import GradientButton from "@/componens/Gradient/ButtonGradient";

export interface paramFilter {
  dateStart: number;
  dateEnd: number;
  statisticType: "byWeek" | "byMonth" | "byYear";
}

interface TabHeaderSelectTimeProps {
  params: paramFilter;
  setParamCustom: (keyName: string, value: any) => void;
}

export const TabHeaderSelectTime = memo(function TabHeaderSelectTime({
  params,
  setParamCustom,
}: TabHeaderSelectTimeProps) {
  const [isModalVisible, showModal, hideModal] = useBoolean();

  const onConfirm = useCallback(
    async (date: Date) => {
      hideModal();
      let mode: any = "isoWeek";
      if (params.statisticType === "byWeek") {
        mode = "isoWeek";
      } else if (params.statisticType === "byMonth") {
        mode = "month";
      } else {
        mode = "year";
      }
      const start = moment(date.getTime()).startOf(mode).unix();
      const end = moment(date.getTime()).endOf(mode).unix();
      setParamCustom("dateStart", start);
      setParamCustom("dateEnd", end);
    },
    [params?.statisticType, setParamCustom]
  );

  const showTextDate = useMemo(() => {
    if (params.statisticType === "byWeek") {
      const start = moment(params.dateStart, "X").format("DD/MM");
      const end = moment(params.dateEnd, "X").format("DD/MM");
      return `${start} - ${end}`;
    } else if (params.statisticType === "byMonth") {
      const start = moment(params.dateStart, "X").format("DD");
      const end = moment(params.dateEnd, "X").format("DD/MM");
      return `${start} - ${end}`;
    } else {
      const start = moment(params.dateStart, "X").format("MM");
      const end = moment(params.dateEnd, "X").format("MM/YYYY");
      return `${start} - ${end}`;
    }
  }, [params]);

  const setStatistic = useCallback(
    (keyName: string, value: any) => {
      setParamCustom(keyName, value);
    },
    [setParamCustom]
  );
  return (
    <SViewContainer>
      <SViewButtonGroup>
        <SButtonTab
          label={"Tuần"}
          keyName={"statisticType"}
          value={"byWeek"}
          styleGradient={{ borderRadius: 0 }}
          onPress={setStatistic}
          offGradient={params.statisticType !== "byWeek"}
        />
        <SButtonTab
          label={"Tháng"}
          keyName={"statisticType"}
          value={"byMonth"}
          styleGradient={{ borderRadius: 0 }}
          onPress={setParamCustom}
          offGradient={params.statisticType !== "byMonth"}
        />
        <SButtonTab
          label={"Năm"}
          keyName={"statisticType"}
          value={"byYear"}
          styleGradient={{ borderRadius: 0 }}
          onPress={setParamCustom}
          offGradient={params.statisticType !== "byYear"}
        />
      </SViewButtonGroup>

      <SViewPickTime>
        <DateTimePickerModal
          mode={"date"}
          onConfirm={onConfirm}
          isVisible={isModalVisible}
          onCancel={hideModal}
        />
        <STextDate onPress={showModal}>{showTextDate}</STextDate>
      </SViewPickTime>
    </SViewContainer>
  );
});

const SButtonTab = styled(GradientButton)`
  flex: 1;
  border-right-width: 1px;
  border-color: ${Colors.grey3};
  border-radius: 0px;
`;

const SViewContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 50px;
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

export default TabHeaderSelectTime;
