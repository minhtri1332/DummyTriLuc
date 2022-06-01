import React, { memo, useCallback, useEffect } from "react";
import SectionContainerStyle from "@/componens/View/SectionView";
import { IC_CHART, IC_HISTORY } from "@/assets";
import { Colors } from "@/themes/Colors";
import { styled, useAsyncFn } from "@/global";
import BaseProgressView from "@/componens/View/BaseProgressView";
import { requestListPractice } from "@/store/home/function";
import { navigateToPracticeDetailScreen } from "@/ultils/navigation";
import { usePracticeByQuery } from "@/store/home";

const data = {
  mode: 5,
  start_time1: 1653923863,
  start_time2: 494543,
  user_id: "17925739-ce0c-489a-93f4-072f981990eb",
  boxid: "nodesp323",
  data: [
    { f: 31.0, p: 1, t: 494543, o: 1 },
    { f: 94.0, p: 3, t: 495365, o: 1 },
    { f: 60.0, p: 3, t: 496229, o: 1 },
    { f: 49.0, p: 4, t: 498757, o: 1 },
    { f: 66.0, p: 2, t: 499498, o: 1 },
    { f: 91.0, p: 3, t: 500377, o: 1 },
    { f: 47.0, p: 2, t: 501188, o: 1 },
    { f: 105.0, p: 4, t: 503688, o: 1 },
    { f: 20.0, p: 1, t: 504503, o: 1 },
    { f: 28.0, p: 1, t: 505259, o: 1 },
    { f: 52.0, p: 4, t: 506059, o: 1 },
    { f: 20.0, p: 4, t: 509116, o: 1 },
    { f: 93.0, p: 3, t: 510224, o: 1 },
    { f: 46.0, p: 2, t: 511138, o: 1 },
  ],
  end_time: 1653923889,
};
export const PracticeComponent = memo(function PracticeComponent() {
  const data = usePracticeByQuery("all");
  const goToStatistic = useCallback(() => {}, []);

  const [{ loading }, getData] = useAsyncFn(async () => {
    await requestListPractice();
  }, []);

  useEffect(() => {
    getData().then();
  }, []);

  return (
    <SectionContainerStyle
      title={"Bài tập gần nhất"}
      iconLeft={IC_HISTORY}
      iconRight={IC_CHART}
      rightAction={goToStatistic}
    >
      <Progress
        progress={0.1}
        hightLightColor={Colors.blue1}
        barColor={Colors.orange1}
      />
      <SViewContent>
        {(data || []).map((item, index) => {
          return <ItemPractice practiceId={item} index={index} key={item} />;
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
  index,
}: {
  practiceId: string;
  index: number;
}) {
  const onPressItem = useCallback(() => {
    navigateToPracticeDetailScreen({ practiceId });
  }, [practiceId]);

  const onLongPressItem = useCallback(() => {
    navigateToPracticeDetailScreen({
      practiceId: "",
      data: data,
    });
  }, []);

  return (
    <SViewItem onPress={onPressItem} onLongPress={onLongPressItem}>
      <SText>Bài tập: {index + 1}</SText>
    </SViewItem>
  );
});

const SViewItem = styled.TouchableOpacity`
  margin: 16px;
`;
const SText = styled.Text`
  color: ${Colors.colorText};
`;
