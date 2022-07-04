import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import SectionContainerStyle from "@/componens/View/SectionView";
import {
  IC_CHART,
  IC_RANK,
  IC_RATING_DOWN,
  IC_RATING_NORMAL,
  IC_RATING_UP,
} from "@/assets";
import { Colors } from "@/themes/Colors";
import { styled, useAsyncFn } from "@/global";
import { requestListMyRating } from "@/store/ratings/functions";
import GradientText from "@/componens/Gradient/TextGradient";
import { navigateToRatingBroadScreen } from "@/ultils/navigation";
import { formatNumberShortCompact } from "@/ultils/formatNumber";
import { Fonts } from "@/assets/fonts";
import { Text, View } from "react-native";

interface PowerProps {}

export const RatingsComponent = memo(function RatingsComponent() {
  const [currentRank, setMyRank] = useState<any>();
  const [statusRank, setStatusRank] = useState(0);
  const [rankUp, setRankUp] = useState("");

  const goToRating = useCallback(() => {
    navigateToRatingBroadScreen();
  }, []);

  const [{ loading }, getData] = useAsyncFn(async () => {
    const myRank = await requestListMyRating();
    setMyRank(myRank);
  }, []);

  useEffect(() => {
    getData().then();
  }, []);

  const isStatusRank = useMemo(() => {
    if (!currentRank) return 0;

    const rank = currentRank?.current_rank - currentRank?.previous_rank;
    setStatusRank(rank);
    if (rank > 0) {
      setRankUp("+");
    }
    if (rank < 0) {
      setRankUp("-");
    }
    return rank;
  }, [currentRank]);

  return (
    <SectionContainerStyle
      title={"Bảng xếp hạng"}
      iconLeft={IC_RANK}
      iconRight={IC_CHART}
      rightAction={goToRating}
    >
      <SViewContent>
        <SViewLeft>
          <SText>Point</SText>
          <STextGradient>
            {formatNumberShortCompact(currentRank?.point)}
          </STextGradient>
        </SViewLeft>
        <SViewRight>
          <SText>Top</SText>
          <SViewRank>
            <StextRanking>#{currentRank?.current_rank || ""}</StextRanking>
            <SImage
              source={
                isStatusRank == 0
                  ? IC_RATING_NORMAL
                  : isStatusRank > 0
                  ? IC_RATING_UP
                  : IC_RATING_DOWN
              }
            />
            <STextStatusRank rankUp={rankUp}>
              {rankUp}
              {statusRank}
            </STextStatusRank>
          </SViewRank>
        </SViewRight>
      </SViewContent>
    </SectionContainerStyle>
  );
});

const SViewRank = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SImage = styled.Image`
  margin-top: 10px;
  margin-right: 4px;
  margin-left: 4px;
`;

const STextStatusRank = styled.Text<{ rankUp: string }>`
  color: ${(props) =>
    props.rankUp === ""
      ? Colors.colorText
      : props.rankUp === "+"
      ? Colors.green1
      : Colors.red1};
  font-size: 12px;
  line-height: 18px;
  margin-top: 10px;
`;

const SText = styled.Text`
  color: ${Colors.colorText};
  font-size: 18px;
  line-height: 22px;
`;
const StextRanking = styled.Text`
  color: ${Colors.colorText};
  font-size: 36px;
  line-height: 44px;
`;
const STextGradient = styled(GradientText)`
  color: ${Colors.colorText};
  font-size: 36px;
  line-height: 54px;
  font-family: ${Fonts.anton};
`;

const SViewContent = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 16px;
`;

const SViewLeft = styled.View`
  flex: 1;
  align-items: center;
  margin-right: 50px;
`;

const SViewRight = styled.View`
  flex: 1;
  align-items: center;
`;

export default RatingsComponent;
