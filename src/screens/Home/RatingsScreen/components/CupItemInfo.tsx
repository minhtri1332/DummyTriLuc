import React, { memo, useCallback } from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";
import * as Animatable from "react-native-animatable";
import { Colors } from "@/themes/Colors";
import { IC_USER_Fill } from "@/assets";
import { useRatings } from "@/store/ratings";

interface Props {
  id: string;
  index: number;
  year: string;
}

const Container = styled.TouchableOpacity`
  height: 76px;
  padding: 0 16px;
  flex-direction: row;
`;

const Left = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${32 + 16}px;
  height: 100%;
`;

const ContentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.grey6};
`;

const Center = styled.View`
  flex: 1;
  height: 100%;
  padding-left: 8px;
  justify-content: center;
`;

const LeftNumber = styled.Text<{ top: number }>`
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.12px;
  color: ${(p) => (p.top < 3 ? "#fff" : Colors.colorText)};
  font-family: Roboto-Medium;
`;

const ViewNumberTop = styled.View<{ top: number }>`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${(p) =>
    p.top === 1
      ? "#FFD140"
      : p.top === 2
      ? "#C4C4C4"
      : p.top === 3
      ? "#DE7C14"
      : "#fff"};
`;
const LeftImage = styled(FastImage)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${Colors.grey6};
`;
const Title = styled.Text`
  font-weight: 500;
  font-size: 15px;
  line-height: 21px;
  color: ${Colors.colorText};
  font-family: Roboto-Medium;
`;
const SubTitle = styled.Text`
  font-size: 13px;
  line-height: 15px;
  color: ${Colors.grey3};
  padding-top: 2px;
`;

export const CupItemInfo = memo(function CupItemInfo(props: Props) {
  const { id, index, year } = props;
  const user = useRatings(id);

  const open = useCallback(() => {
    Keyboard.dismiss();
  }, [id]);

  return (
    <Animatable.View animation={"slideInUp"} delay={10} duration={200}>
      <Container onPress={open}>
        <Left>
          {index < 3 ? (
            <ViewNumberTop top={index + 1}>
              <LeftNumber top={index}>{index + 1}</LeftNumber>
            </ViewNumberTop>
          ) : (
            <LeftNumber style={{ paddingLeft: 8 }} top={index}>
              {index + 1}
            </LeftNumber>
          )}
        </Left>
        <ContentContainer>
          <LeftImage source={IC_USER_Fill} />
          <Center>
            <Title numberOfLines={1}>{user?.user_name}</Title>
            <SubTitle numberOfLines={1}>{user?.point}</SubTitle>
          </Center>
          {/*<Right>*/}

          {/*</Right>*/}
        </ContentContainer>
      </Container>
    </Animatable.View>
  );
});
