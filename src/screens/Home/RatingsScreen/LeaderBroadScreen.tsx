import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Animated, StatusBar, StyleSheet, Text, View } from "react-native";
import { styled, useAsyncFn } from "@/global";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { CupItemInfo } from "@/screens/Home/RatingsScreen/components/CupItemInfo";
import { CupOfTop } from "@/screens/Home/RatingsScreen/components/CupOfTop";
import { CommonRecycleList } from "@/common/CommonRecycleList";
import { Colors } from "@/themes/Colors";

const ITEM_MAX_HEIGHT = 320;

const Container = styled.View`
  flex: 1;
  background-color: #007aff;
`;
const ContentContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #00bcd4;
`;

const HeaderView = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 320px;
  z-index: 1;
  background-color: #007aff;
`;

const BottomMe = styled.View`
  border-top-width: 0.8px;
  border-top-color: #cecece;
  background-color: #007aff;
  padding-bottom: ${getBottomSpace() / 2}px;
`;
const SModalHeaderWithTitle = styled(DynamicHeader).attrs((p) => ({
  backgroundColor: "#007AFF",
  hideSeparator: true,
  iconCloseStyle: {
    tintColor: p.theme.backgroundColor,
  },
  titleStyle: {
    color: p.theme.backgroundColor,
  },
}))``;

const keyExtractor = (item: any): string => {
  return item;
};

export const LeaderBoardScreen = memo(function LeaderBoardScreen() {
  const data = ["1", "2"];
  const [top, setTop] = useState<string[]>([]);
  const animatedScrollYValue = useRef(new Animated.Value(0)).current;
  const [year, setYear] = useState("all");
  const [initScreen, setInitScreen] = useState(false);
  const me = { name: "1" };
  const [{ loading }, loadData] = useAsyncFn(async () => {
    // await requestInitData();
  }, []);

  // useEffect(() => {
  //   const entry = StatusBar.pushStackEntry({
  //     barStyle: "light-content",
  //     animated: true,
  //   });
  //
  //   setTimeout(() => {
  //     setInitScreen(true);
  //   }, 300);
  //
  //   return () => {
  //     StatusBar.popStackEntry(entry);
  //   };
  // }, []);

  // const employees: string[] = useSelector((state: any) =>
  //   // memoEmployeeAwardSelectors(state, normalizeStringForSearch(""), year)
  // );

  // useEffect(() => {
  //   setTop(data.slice(0, 3).map((item) => item.split("__")[0]));
  // }, [data]);

  const onYearChange = useCallback(
    (_value: string) => {
      setYear(_value);
    },
    [year]
  );

  // const [meId, meIndex] = useMemo(() => {
  //   const _e = employees.find((item) => item.split("__")[0] === myEmployee);
  //   if (!_e) {
  //     return [undefined, undefined];
  //   }
  //   return _e.split("__");
  // }, [myEmployee, employees]);

  const itemHeight = animatedScrollYValue.interpolate({
    inputRange: [0, 320],
    outputRange: [0, -320],
    extrapolate: "clamp",
  });

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
      {/*<DynamicHeader title={"oko"} />*/}
      <View
        style={{
          flex: 1,
        }}
      >
        <HeaderView
          style={{
            transform: [
              {
                translateY: itemHeight,
              },
            ],
          }}
        >
          <CupOfTop
            top1={top[0]}
            top2={top[1]}
            top3={top[2]}
            year={year}
            onChangeYear={onYearChange}
            animatedScroll={animatedScrollYValue}
          />
        </HeaderView>
        <ContentContainer>
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
            itemHeight={120}
            rowRenderer={_rowRenderer}
            isLoadMore={false}
            noMore={false}
            error={false}
            loadMorable={true}
            extendedState={undefined}
            forceNonDeterministicRendering={true}
          />
        </ContentContainer>

        <BottomMe>
          <CupItemInfo id={"1"} index={Number(1)} year={year} />
        </BottomMe>
      </View>
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
    flex: 1,
    paddingBottom: 120,
    paddingTop: ITEM_MAX_HEIGHT,
  },
});
