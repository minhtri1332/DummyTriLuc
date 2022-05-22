import React, { memo, useCallback, useMemo } from "react";
import { InteractionManager, Keyboard } from "react-native";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";
import * as Animatable from "react-native-animatable";
import { Colors } from "@/themes/Colors";
import { IC_USER_Fill } from "@/assets";

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
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.grey6};
`;

const Center = styled.View`
  flex: 1;
  height: 100%;
  padding-left: 8px;
  justify-content: center;
`;

const Right = styled.View`
  width: 110px;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftNumber = styled.Text<{ top: number }>`
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.12px;
  color: ${(p) => (p.top < 3 ? "#fff" : "#242424")};
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
  color: ${Colors.grey1};
  font-family: Roboto-Medium;
`;
const SubTitle = styled.Text`
  font-size: 13px;
  line-height: 15px;
  color: ${Colors.grey3};
  padding-top: 2px;
`;

const WrapIcon = styled.View`
  width: 30px;
  justify-content: center;
  align-items: center;
  margin-left: 6px;
`;

const Icon = styled.Image<{ color: string }>`
  tint-color: ${(p) => p.color};
  width: 16px;
  height: 16px;
`;

const Count = styled.Text`
  color: ${Colors.grey1};
  font-size: 13px;
  line-height: 15px;
  padding-top: 6px;
`;

export const CupItemInfo = memo(function CupItemInfo(props: Props) {
  const { id, index, year } = props;
  console.log("id");
  //
  // const employee = useEmployee(id);
  // const user = userUsername(employee?.user_id || "");

  const open = useCallback(() => {
    Keyboard.dismiss();
    // InteractionManager.runAfterInteractions(() => {
    //   openEmployeeModal({ id });
    // });
  }, [id]);

  const keyPoint = useMemo(() => {
    return year === "all" ? "points" : `points_${year}`;
  }, [year]);

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
            <Title numberOfLines={1}>No_data</Title>
            <SubTitle numberOfLines={1}>No_description</SubTitle>
          </Center>
          <Right>
            <WrapIcon>
              <Icon source={require("../assets/star.png")} color={"#E7B117"} />
              <Count>123</Count>
            </WrapIcon>
            <WrapIcon>
              <Icon
                source={require("../assets/certificate.png")}
                color={"#007AFF"}
              />
              <Count>321</Count>
            </WrapIcon>
            <WrapIcon>
              <Icon
                source={require("../assets/medal_star.png")}
                color={"#0FAE3C"}
              />
              <Count>312</Count>
            </WrapIcon>
          </Right>
        </ContentContainer>
      </Container>
    </Animatable.View>
  );
});
