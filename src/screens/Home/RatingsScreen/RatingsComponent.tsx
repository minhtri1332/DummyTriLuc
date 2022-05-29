import React, {memo, useCallback, useEffect, useState} from "react";
import SectionContainerStyle from "@/componens/View/SectionView";
import {IC_CHART, IC_RANK} from "@/assets";
import {Colors} from "@/themes/Colors";
import {styled, useAsyncFn} from "@/global";
import {requestListMyRating} from "@/store/ratings/functions";
import GradientText from "@/componens/Gradient/TextGradient";
import {navigateToRatingBroadScreen} from "@/ultils/navigation";
import {formatNumberShortCompact,} from "@/ultils/formatNumber";

interface PowerProps {}

export const RatingsComponent = memo(function RatingsComponent() {
  const [currentRank, setMyRank] = useState<any>();
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
          <SText>Xếp hạng</SText>
          <STextGradient>{currentRank?.current_rank || ""}</STextGradient>
        </SViewRight>
      </SViewContent>
    </SectionContainerStyle>
  );
});

const SText = styled.Text`
  color: ${Colors.colorText};
  font-size: 17px;
`;
const STextGradient = styled(GradientText)`
  font-size: 30px;
  font-family: Roboto-Medium;
  margin-top: 8px;
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
