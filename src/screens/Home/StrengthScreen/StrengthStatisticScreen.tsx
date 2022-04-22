import React, { memo, useCallback, useEffect, useState } from "react";
import { ScreenWrapper } from "@/common/CommonStyles";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { styled } from "@/global";
import { Colors } from "@/themes/Colors";
import moment from "moment";
import GradientButton from "@/componens/Gradient/ButtonGradient";
import { requestStrengthStatistic } from "@/store/home/function";
import BarChartComponent from "@/screens/Home/HitScreen/BarChartComponent";
import GradientText from "@/componens/Gradient/TextGradient";
import TabHeaderSelectTime, {
  paramFilter,
} from "@/screens/Home/components/TabHeaderSelectTime";

export const StrengthStatisticScreen = memo(function StrengthStatisticScreen() {
  const [paramFilter, setParamFilter] = useState<paramFilter>({
    statisticType: "byWeek",
    dateStart: moment(new Date()).startOf("isoWeek").unix(),
    dateEnd: moment(new Date()).endOf("isoWeek").unix(),
  });
  const [dataHitStatic, setDataHitStatic] = useState({
    list_strength: [],
    stat: [],
  });

  const setParamCustom = useCallback(
    (keyName: string, value: string) => {
      setParamFilter({ ...paramFilter, [keyName]: value });
    },
    [paramFilter]
  );

  const onConfirm = useCallback(async () => {
    const strengthStatic = await requestStrengthStatistic(paramFilter);
    setDataHitStatic(strengthStatic);
    //setState(date);
    // requestAnimationFrame(() => {
    //     onChange?.(moment(date).unix());
    // });
  }, [paramFilter]);
  useEffect(() => {
    onConfirm();
  }, []);
  return (
    <ScreenWrapper>
      <DynamicHeader title={"Sức mạnh"} />

      <TabHeaderSelectTime
        params={paramFilter}
        setParamCustom={setParamCustom}
      />

      <BarChartComponent listData={dataHitStatic.list_strength} />
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

export default StrengthStatisticScreen;
