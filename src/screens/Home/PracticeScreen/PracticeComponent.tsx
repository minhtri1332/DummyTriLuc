import React, { memo, useCallback, useEffect } from "react";
import SectionContainerStyle from "@/componens/View/SectionView";
import { IC_CHART, IC_POWER } from "@/assets";
import { Colors } from "@/themes/Colors";
import { styled, useAsyncFn } from "@/global";
import BaseProgressView from "@/componens/View/BaseProgressView";
import PieChartHome from "@/screens/Home/components/PieChartHome";
import {
  RawDataStrengthGoal,
  requestListPractice,
} from "@/store/home/function";
import {
  navigateToHitStatisticScreen,
  navigateToPracticeDetailScreen,
  navigateToStrengthStatisticScreen,
} from "@/ultils/navigation";
import { usePracticeByQuery } from "@/store/home";
import { Text } from "react-native";

interface PowerProps {
  dataStrength: RawDataStrengthGoal;
}

export const PracticeComponent = memo(function PracticeComponent(
  props: PowerProps
) {
  const data = usePracticeByQuery("all");
  const goToStatistic = useCallback(() => {}, []);

  const [{ loading }, getData] = useAsyncFn(async () => {
    await requestListPractice();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <SectionContainerStyle
      title={"Bài tập gần nhất"}
      iconLeft={IC_POWER}
      iconRight={IC_CHART}
      rightAction={goToStatistic}
    >
      <Progress
        progress={0.1}
        hightLightColor={Colors.blue1}
        barColor={Colors.orange1}
      />
      <SViewContent>
        {(data || []).map((item) => {
          return <ItemPractice practiceId={item} />;
        })}
      </SViewContent>
    </SectionContainerStyle>
  );
});

const Progress = styled(BaseProgressView)`
  height: 4px;
`;

const SViewContent = styled.View``;

export default PracticeComponent;

export const ItemPractice = memo(function ItemPractice({
  practiceId,
}: {
  practiceId: string;
}) {
  const onPressItem = useCallback(() => {
    navigateToPracticeDetailScreen({ practiceId });
  }, [practiceId]);

  return (
    <SViewItem onPress={onPressItem}>
      <SText>{practiceId}</SText>
    </SViewItem>
  );
});

const SViewItem = styled.TouchableOpacity`
  margin: 16px;
`;
const SText = styled.Text`
  color: ${Colors.colorText};
`;
