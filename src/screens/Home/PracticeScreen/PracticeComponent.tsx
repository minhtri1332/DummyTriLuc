import React, { memo, useCallback, useEffect } from "react";
import SectionContainerStyle from "@/componens/View/SectionView";
import { IC_CHART, IC_HISTORY } from "@/assets";
import { Colors } from "@/themes/Colors";
import { styled, useAsyncFn } from "@/global";
import BaseProgressView from "@/componens/View/BaseProgressView";
import { requestListPractice } from "@/store/home/function";
import { navigateToPracticeDetailScreen } from "@/ultils/navigation";
import { usePracticeByQuery } from "@/store/home";

const data ={
  "practice": {
    "mode": 5,
    "start_time": "00:00:00.000",
    "data": [
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:02.900"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:05.624"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:06.659"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:07.372"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:07.444"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:07.714"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:08.016"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:08.258"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:08.410"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:08.563"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:09.338"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:09.440"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:09.505"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:10.554"
      },
      {
        "f": 20.14,
        "p": 1,
        "t": "00:00:10.626"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:10.932"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:11.135"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:12.132"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:12.194"
      },
      {
        "f": 20.14,
        "p": 1,
        "t": "00:00:30.272"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:30.351"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:30.656"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:30.689"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:30.943"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:31.258"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:31.564"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:31.869"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:32.176"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:32.445"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:32.762"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:33.023"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:33.087"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:33.568"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:33.883"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:34.198"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:34.514"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:34.873"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:34.943"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:35.207"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:35.269"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:35.572"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:35.939"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:35.975"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:36.334"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:36.699"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:38.022"
      },
      {
        "f": 20.14,
        "p": 1,
        "t": "00:00:38.969"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:39.447"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:40.075"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:40.137"
      },
      {
        "f": 20.14,
        "p": 1,
        "t": "00:00:40.564"
      },
      {
        "f": 20.14,
        "p": 1,
        "t": "00:00:41.178"
      },
      {
        "f": 20.14,
        "p": 1,
        "t": "00:00:41.242"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:41.551"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:41.879"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:42.318"
      },
      {
        "f": 20.14,
        "p": 1,
        "t": "00:00:42.357"
      },
      {
        "f": 20.14,
        "p": 2,
        "t": "00:00:44.110"
      },
      {
        "f": 20.14,
        "p": 1,
        "t": "00:00:44.172"
      },
      {
        "f": 20.14,
        "p": 1,
        "t": "00:00:44.613"
      },
      {
        "f": 20.14,
        "p": 4,
        "t": "00:00:44.980"
      }
    ]
  }
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
    navigateToPracticeDetailScreen({
      practiceId: "",
      data: data,
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
