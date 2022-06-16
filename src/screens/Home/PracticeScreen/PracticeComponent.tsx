import React, { memo, useCallback, useEffect } from "react";
import SectionContainerStyle from "@/componens/View/SectionView";
import { IC_CHART, IC_HISTORY } from "@/assets";
import { Colors } from "@/themes/Colors";
import { styled, useAsyncFn } from "@/global";
import BaseProgressView from "@/componens/View/BaseProgressView";
import { requestListPractice } from "@/store/home/function";
import { navigateToPracticeDetailScreen } from "@/ultils/navigation";
import { usePracticeByQuery } from "@/store/home";
import VideoUrlServiceClass from "@/services/VideoUrlClass";

const data = {
  practice: {
    mode: 5,
    start_time: "00:00:00.000",
    data: [
      {
        f: 11,
        p: 4,
        t: "00:00:03.900",
      },
      {
        f: 12,
        p: 4,
        t: "00:00:04.624",
      },
      {
        f: 13,
        p: 4,
        t: "00:00:05.659",
      },
      {
        f: 14,
        p: 4,
        t: "00:00:06.372",
      },
      {
        f: 15,
        p: 3,
        t: "00:00:07.444",
      },
      {
        f: 16,
        p: 4,
        t: "00:00:09.714",
      },
      {
        f: 18,
        p: 4,
        t: "00:00:10.016",
      },
      {
        f: 19,
        p: 4,
        t: "00:00:11.258",
      },
      {
        f: 25,
        p: 4,
        t: "00:00:12.410",
      },
      {
        f: 20,
        p: 4,
        t: "00:00:13.410",
      },
      {
        f: 20,
        p: 4,
        t: "00:00:14.410",
      },
    ],
  },
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
    const currentVideoLocal = VideoUrlServiceClass.getVideoUrl();

    navigateToPracticeDetailScreen({
      practiceId: "",
      data: data,
      currentVideoLocal: currentVideoLocal,
    });
  }, []);

  return (
    <SViewItem onPress={onLongPressItem} onLongPress={onLongPressItem}>
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
