import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Animated, StatusBar, StyleSheet } from "react-native";
import { styled, useAsyncFn } from "@/global";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { CupItemInfo } from "@/screens/Home/RatingsScreen/components/CupItemInfo";
import { CommonRecycleList } from "@/common/CommonRecycleList";
import { Colors } from "@/themes/Colors";
import { requestListAllRatings } from "@/store/ratings/functions";
import { myRating, useRatingsByQuery } from "@/store/ratings";

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.backgroundColor};
`;
const ContentContainer = styled.View`
  flex: 1;
  background-color: ${Colors.backgroundColor};
`;

const BottomMe = styled.View`
  border-top-width: 0.8px;
  border-top-color: #cecece;
  background-color: ${Colors.backgroundColor};
  padding-bottom: ${getBottomSpace() / 2}px;
`;
const SModalHeaderWithTitle = styled(DynamicHeader).attrs((p) => ({
  backgroundColor: Colors.backgroundColor,
  hideSeparator: true,
  iconCloseStyle: {
    tintColor: p.theme.backgroundColor,
  },
  titleStyle: {
    color: p.theme.backgroundColor,
  },
}))``;

export const RatingBroadScreen = memo(function RatingBroadScreen() {
  const data = useRatingsByQuery("all");
  const myRate = myRating();
  const animatedScrollYValue = useRef(new Animated.Value(0)).current;
  const [year, setYear] = useState("all");
  const [initScreen, setInitScreen] = useState(false);
  const [{ loading }, loadData] = useAsyncFn(async () => {
    await requestListAllRatings();
  }, []);

  useEffect(() => {
    const entry = StatusBar.pushStackEntry({
      barStyle: "light-content",
      animated: true,
    });

    setTimeout(() => {
      setInitScreen(true);
    }, 300);

    return () => {
      StatusBar.popStackEntry(entry);
    };
  }, []);

  useEffect(() => {
    loadData().then();
  }, []);

  const _rowRenderer = useCallback(
    (
      type: string | number,
      data: any,
      index: number,
      extendedState?: object
    ) => {
      return <CupItemInfo id={data} index={index} year={"all"} />;
    },
    []
  );

  return (
    <Container>
      <SModalHeaderWithTitle
        title={"Xếp hạng"}
        backgroundColor={Colors.backgroundColor}
      />

      <ContentContainer>
        {initScreen && (
          <CommonRecycleList
            onScroll={Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { y: animatedScrollYValue } },
                },
              ],
              { useNativeDriver: false }
            )}
            style={styles.list}
            data={data}
            itemHeight={76}
            rowRenderer={_rowRenderer}
            loading={loading}
            isRefreshing={loading}
            isLoadMore={false}
            noMore={false}
            error={false}
            loadMorable={false}
          />
        )}
      </ContentContainer>

      {myRate && (
        <BottomMe>
          <CupItemInfo
            id={myRate?.user_id}
            index={myRate?.current_rank - 1}
            year={year}
            isMyRate={true}
          />
        </BottomMe>
      )}
    </Container>
  );
});

const styles = StyleSheet.create({
  headerTop: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  list: {
    paddingBottom: 120,
  },
});
