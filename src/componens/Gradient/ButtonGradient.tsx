import LinearGradient from "react-native-linear-gradient";
import { Text } from "react-native";
import React, { memo } from "react";
import { Colors } from "@/themes/Colors";
import { styled } from "@/global";

const GradientButton = (props: any) => {
  return (
    <SBaseOpacityButton onPress={props.onPress}>
      <SLinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[Colors.red1, Colors.red3, Colors.red2]}
      >
        <SText>{props.label}</SText>
      </SLinearGradient>
    </SBaseOpacityButton>
  );
};

const SLinearGradient = styled(LinearGradient)`
  padding: 0 16px;
  height: 32px;
  justify-content: center;
  border-radius: 4px;
`;

const SBaseOpacityButton = styled.TouchableOpacity`
  padding: 0 16px;
  border-radius: 4px;
`;

const SText = styled.Text`
  color: ${Colors.grey5};
  font-family: Roboto-Medium;
`;

export default memo(GradientButton);
