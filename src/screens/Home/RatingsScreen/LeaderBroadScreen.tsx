import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { styled, useAsyncFn } from "@/global";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { Colors } from "@/themes/Colors";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { CupItemInfo } from "@/screens/Home/RatingsScreen/components/CupItemInfo";
import { CupOfTop } from "@/screens/Home/RatingsScreen/components/CupOfTop";

const ITEM_MAX_HEIGHT = 320;

const Container = styled.View`
  flex: 1;
  background-color: #007aff;
`;
const ContentContainer = styled.View`
  flex: 1;
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
  const data = ["1", "2", "3", "4"];
  const [top, setTop] = useState<string[]>([]);
  const animatedScrollYValue = useRef(new Animated.Value(0)).current;
  const [year, setYear] = useState("all");
  const [initScreen, setInitScreen] = useState(false);
  const me = { name: "1" };
  const [{ loading }, loadData] = useAsyncFn(async () => {
    // await requestInitData();
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

  // const employees: string[] = useSelector((state: any) =>
  //   // memoEmployeeAwardSelectors(state, normalizeStringForSearch(""), year)
  // );

  useEffect(() => {
    setTop(data.slice(0, 3).map((item) => item.split("__")[0]));
  }, [data]);

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

  const renderItem = useCallback(({ item }: any) => {
    // return <CupItemInfo id={item} index={index} year={"all"} />;
    return (
      <View style={{ backgroundColor: Colors.white }}>
        <Text style={{ height: 60 }}>asdas</Text>
      </View>
    );
  }, []);

  return (
    <Container>
      {/*<SModalHeaderWithTitle*/}
      {/*  title={"Leaderboards"}*/}
      {/*  backgroundColor={"#007AFF"}*/}
      {/*/>*/}
      <View
        style={{
          flex: 1,
          overflow: "hidden",
          backgroundColor: "#007AFF",
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
          {
            <FlatList
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: { contentOffset: { y: animatedScrollYValue } },
                  },
                ],
                { useNativeDriver: false }
              )}
              keyExtractor={keyExtractor}
              data={data}
              renderItem={renderItem}
              keyboardDismissMode={"interactive"}
              keyboardShouldPersistTaps={"always"}
              contentContainerStyle={styles.list}
            />
          }
        </ContentContainer>
        {/*{meId ? (*/}
        {/*  <BottomMe>*/}
        {/*    <CupItemInfo id={meId} index={Number(meIndex)} year={year} />*/}
        {/*  </BottomMe>*/}
        {/*) : null}*/}
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
