import React, { memo, useCallback, useEffect, useState } from "react";
import SectionContainerStyle from "@/componens/View/SectionView";
import { IC_CHART, IC_RANK } from "@/assets";
import { Colors } from "@/themes/Colors";
import { styled, useAsyncFn } from "@/global";
import BaseProgressView from "@/componens/View/BaseProgressView";
import {
  requestListAllRatings,
  requestListMyRating,
} from "@/store/ratings/functions";
import { RawRatings } from "@/store/ratings/types";
import GradientText from "@/componens/Gradient/TextGradient";

interface PowerProps {}

export const RatingsComponent = memo(function RatingsComponent() {
  const [currentRank, setMyRank] = useState({});
  const goToStatistic = useCallback(() => {}, []);

  const [{ loading }, getData] = useAsyncFn(async () => {
    const myRank = await requestListMyRating();
    setMyRank(myRank);
    // await requestListAllRatings();
  }, []);

  useEffect(() => {
    getData().then();
  }, []);
  console.log(currentRank);
  return (
    <SectionContainerStyle
      title={"Bảng xếp hạng"}
      iconLeft={IC_RANK}
      iconRight={IC_CHART}
      rightAction={goToStatistic}
    >
      <SViewContent>
        <SViewLeft>
          <SText>Point</SText>
          <STextGradient>{currentRank?.point}</STextGradient>
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
