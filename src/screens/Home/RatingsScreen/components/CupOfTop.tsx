import React, { memo } from "react";
import styled from "styled-components/native";
import { PickerYear } from "./PickerYear";
import { Animated } from "react-native";
import { CupInfo } from "@/screens/Home/RatingsScreen/components/CupInfo";
import { Colors } from "@/themes/Colors";

const Container = styled(Animated.View)`
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  background-color: ${Colors.backgroundHeader};
`;

const ViewDate = styled.View`
  height: 56px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ViewTop = styled.View`
  padding-top: 130px;
  padding-left: 30px;
  padding-right: 30px;
`;

const IconTop = styled.Image`
  width: 260px;
  height: 142px;
`;

const ViewRowTopAbsolute = styled.View`
  position: absolute;
  top: 5px;
  width: 260px;
  height: 210px;
  align-self: center;
  z-index: 1;
  flex-direction: row;
  align-items: center;
`;

const ColTopCenter = styled.View`
  flex: 1;
  padding-bottom: 40px;
`;

const ColTopSide = styled.View`
  flex: 1;
  padding-top: 70px;
`;

const ImageBg = styled.Image`
  width: 320px;
  height: 190px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
`;
interface Props {
  year: string;
  onChangeYear: (value: string) => void;
  top1: string;
  top2: string;
  top3: string;
  animatedScroll?: any;
}

export const CupOfTop = memo(function (props: Props) {
  const { year, onChangeYear, top1, top2, top3, animatedScroll } = props;

  const itemHeight = animatedScroll.interpolate({
    inputRange: [0, 320],
    outputRange: [0, 160],
    extrapolate: "clamp",
  });

  const opacity = animatedScroll.interpolate({
    inputRange: [0, 320 - 1, 320],
    outputRange: [1, 0, 0],
    extrapolate: "clamp",
  });

  return (
    <Container
      style={{
        transform: [
          {
            scale: opacity,
          },
          {
            translateY: itemHeight,
          },
        ],
        opacity: opacity,
      }}
    >
      {/*<ViewDate>*/}
      {/*  <PickerYear selectedValue={year} onValueChange={onChangeYear} />*/}
      {/*</ViewDate>*/}
      <ViewTop>
        <ImageBg source={require("../assets/leader_board_bg.png")} />
        <ViewRowTopAbsolute>
          <ColTopSide>
            <CupInfo
              userId={top2}
              size={50}
              icon={require("../assets/crown_2.png")}
              iconSize={30}
              year={year}
            />
          </ColTopSide>
          <ColTopCenter>
            <CupInfo
              userId={top1}
              size={70}
              icon={require("../assets/crown_1.png")}
              iconSize={40}
              year={year}
            />
          </ColTopCenter>
          <ColTopSide>
            <CupInfo
              userId={top3}
              size={50}
              icon={require("../assets/crown_3.png")}
              iconSize={30}
              year={year}
            />
          </ColTopSide>
        </ViewRowTopAbsolute>
        <IconTop source={require("../assets/leader_board_top.png")} />
      </ViewTop>
    </Container>
  );
});
