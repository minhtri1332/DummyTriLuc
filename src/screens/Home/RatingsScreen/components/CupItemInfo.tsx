import React, { memo, useCallback, useMemo } from "react";
import { Image, Keyboard, View } from "react-native";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";
import * as Animatable from "react-native-animatable";
import { Colors } from "@/themes/Colors";
import {
  IC_RATING_DOWN,
  IC_RATING_NORMAL,
  IC_RATING_NUMBER_1,
  IC_RATING_UP,
  IC_USER_Fill,
} from "@/assets";
import { useRatings } from "@/store/ratings";
import { formatNumberShortCompact } from "@/ultils/formatNumber";
import { Fonts } from "@/assets/fonts";

interface Props {
  id: string;
  index: number;
  year: string;
  isMyRate?: boolean;
}

export const CupItemInfo = memo(function CupItemInfo(props: Props) {
  const { id, index, year } = props;
  const user = useRatings(id);

  const open = useCallback(() => {
    Keyboard.dismiss();
  }, [id]);

  const isStatusRank = useMemo(() => {
    if (!user) return 0;

    return user?.current_rank - user?.previous_rank;
  }, [user]);

  return (
    <Animatable.View animation={"slideInUp"} delay={10} duration={200}>
      <Container onPress={open} isMyRate={props.isMyRate}>
        <Left isTopRating={index + 1}>
          {index < 3 ? (
            <ViewNumberTop top={index + 1}>
              {index + 1 === 1 ? (
                <Image source={IC_RATING_NUMBER_1} />
              ) : (
                <LeftNumber top={index}># {index + 1}</LeftNumber>
              )}
            </ViewNumberTop>
          ) : (
            <ViewNumberTop top={0}>
              <LeftNumber top={index}># {index + 1}</LeftNumber>
            </ViewNumberTop>
          )}
        </Left>
        <ContentContainer>
          <Center>
            <SImage
              source={
                isStatusRank == 0
                  ? IC_RATING_NORMAL
                  : isStatusRank > 0
                  ? IC_RATING_UP
                  : IC_RATING_DOWN
              }
            />
            <SText
              isColor={
                isStatusRank == 0
                  ? Colors.grey3
                  : isStatusRank > 0
                  ? Colors.green1
                  : Colors.red1
              }
            >
              {isStatusRank}
            </SText>
            <STextGradient>
              {formatNumberShortCompact(user?.point)}
            </STextGradient>
            <Title numberOfLines={1}>{user?.user_name}</Title>
          </Center>

          <Right>
            <LeftImage source={IC_USER_Fill} />
          </Right>
        </ContentContainer>
      </Container>
    </Animatable.View>
  );
});

const Container = styled.TouchableOpacity<{ isMyRate?: boolean }>`
  background-color: ${Colors.greyItem};
  border-bottom-width: ${(props) => (props.isMyRate ? 0 : 8)}px;
  flex-direction: row;
  height: 76px;
`;

const SImage = styled.Image`
  margin-top: 4px;
  margin-right: 4px;
`;

const STextGradient = styled.Text`
  font-family: ${Fonts.anton};
  color: ${Colors.orange1};
  padding-right: 8px;
  font-size: 18px;
`;
const SText = styled.Text<{ isColor: string }>`
  font-family: ${Fonts.anton};
  color: ${(props) => props.isColor || Colors.grey1};
  padding-right: 10px;
  font-size: 12px;
  margin-top: 4px;
`;

const Left = styled.View<{ isTopRating: number }>`
  flex-direction: row;
  align-items: center;
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${(p) =>
    p.isTopRating < 4 ? Colors.red1 : Colors.colorBgTitle};
`;

const Right = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${32 + 16}px;
  margin-right: 16px;
  height: 100%;
`;

const ContentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const Center = styled.View`
  flex: 1;
  padding-left: 8px;
  flex-direction: row;
`;

const LeftNumber = styled.Text<{ top: number }>`
  color: ${Colors.white};
  font-family: ${Fonts.anton};
  font-size: 24px;
`;

const ViewNumberTop = styled.View<{ top: number }>`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const LeftImage = styled(FastImage)`
  width: 40px;
  height: 40px;
  border-width: 1px;
  border-color: ${Colors.grey4};
  border-radius: 25px;
  background-color: ${Colors.grey6};
`;

const Title = styled.Text`
  font-size: 18px;
  color: ${Colors.grey1};
  font-family: ${Fonts.anton};
  align-self: center;
`;
