import LinearGradient from "react-native-linear-gradient";
import React, { memo, useCallback } from "react";
import { Colors } from "@/themes/Colors";
import { styled } from "@/global";
import { ActivityIndicator, TextStyle, ViewStyle } from "react-native";
import { Fonts } from "@/assets/fonts";

interface GradientButtonProps {
  onPress: (keyName: string, value: string) => void;
  style?: ViewStyle;
  styleGradient?: ViewStyle;
  textStyle?: TextStyle;
  keyName?: string;
  value?: string;
  label: string;
  offGradient?: boolean;
  loading?: boolean;
}

const GradientButton = memo((props: GradientButtonProps) => {
  const onPressButton = useCallback(() => {
    props.onPress && props.onPress(props.keyName || "", props.value || "");
  }, [props.onPress, props.keyName, props.keyName]);

  return (
    <SBaseOpacityButton style={props.style} onPress={onPressButton}>
      {!props.offGradient ? (
        <SLinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[Colors.red1, Colors.red3, Colors.red2]}
          style={props.styleGradient}
        >
          {!props.loading ? (
            <SText style={props.textStyle}>{props.label}</SText>
          ) : (
            <ActivityIndicator color={Colors.grey5} />
          )}
        </SLinearGradient>
      ) : (
        <SViewLabel>
          <SText>{props.label}</SText>
        </SViewLabel>
      )}
    </SBaseOpacityButton>
  );
});

const SViewLabel = styled.View`
  flex: 1;
  border-right-width: 1px;
  border-color: ${Colors.grey3};
  border-radius: 0px;
  align-items: center;
  justify-content: center;
`;

const SLinearGradient = styled(LinearGradient)`
  padding: 0 16px;
  min-height: 32px;
  justify-content: center;
  border-radius: 4px;
  align-items: center;
`;

const SBaseOpacityButton = styled.TouchableOpacity`
  height: 32px;
`;

const SText = styled.Text`
  color: ${Colors.grey5};
  font-family: ${Fonts.anton};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
`;

export default GradientButton;
