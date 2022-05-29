import React, { memo, useCallback } from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";
import * as Animatable from "react-native-animatable";
import { Colors } from "@/themes/Colors";
import { IC_USER_Fill } from "@/assets";
import { useRatings } from "@/store/ratings";
import { formatNumberShortCompact } from "@/ultils/formatNumber";

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

  return (
    <Animatable.View animation={"slideInUp"} delay={10} duration={200}>
      <Container onPress={open} isMyRate={props.isMyRate}>
        <Left>
          {index < 3 ? (
            <ViewNumberTop top={index + 1}>
              <LeftNumber top={index}>{index + 1}</LeftNumber>
            </ViewNumberTop>
          ) : (
            <ViewNumberTop top={0}>
              <LeftNumber top={index}>{index + 1}</LeftNumber>
            </ViewNumberTop>
          )}
        </Left>

        <ContentContainer>
          <Center>
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
  background-color: ${Colors.backgroundColor};
  border-bottom-width: ${(props) => (props.isMyRate ? 0 : 8)}px;
  flex-direction: row;
  height: 76px;
`;

const STextGradient = styled.Text`
  font-family: Roboto Medium;
  color: ${Colors.orange1};
  padding-right: 8px;
  font-size: 22px;
`;

const Left = styled.View`
  flex-direction: row;
  align-items: center;
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
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
  color: ${(p) => (p.top < 3 ? "#fff" : Colors.colorText)};
  font-family: Roboto-Medium;
  letter-spacing: 0.12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
`;

const ViewNumberTop = styled.View<{ top: number }>`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${(p) =>
    p.top == 0
      ? Colors.colorTab
      : p.top === 1
      ? "#FFD140"
      : p.top === 2
      ? "#C4C4C4"
      : p.top === 3
      ? "#DE7C14"
      : "#fff"};
`;

const LeftImage = styled(FastImage)`
  width: 45px;
  height: 45px;
  border-radius: 25px;
  background-color: ${Colors.grey6};
`;

const Title = styled.Text`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: ${Colors.colorText};
  font-family: Roboto-Medium;
`;
