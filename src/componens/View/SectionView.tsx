import { styled } from "@/global";
import React, { memo, ReactElement, useCallback, useState } from "react";
import { Colors } from "@/themes/Colors";
import { ImageSourcePropType, View, ViewProps } from "react-native";
import { TransitionViewController } from "@/ultils/transitions";

export interface SectionContainerProps extends ViewProps {
  title: string;
  iconLeft?: ImageSourcePropType;
  iconRight?: ImageSourcePropType;
  children?: ReactElement | ReactElement[];
  rightTitleAction?: string;
  rightAction?: () => void;
}

export const SectionContainerStyle = memo(function SectionContainerStyle({
  title,
  children,
  iconRight,
  iconLeft,
  rightAction,
}: SectionContainerProps) {
  const [isExpand, setExpand] = useState(true);

  const onPress = useCallback(() => {
    setExpand(!isExpand);
  }, [isExpand]);

  const onPressIconRight = useCallback(() => {
    rightAction && rightAction();
  }, [rightAction]);

  return (
    <SectionContainer>
      <TransitionViewController isExpand={isExpand} />

      {title !== "" && (
        <HeaderWrapper onPress={onPress}>
          <SViewTitle>
            {iconLeft && <SImageLeft source={iconLeft} />}
            <Title>{title}</Title>
          </SViewTitle>

          {iconRight && (
            <STouchRight onPress={onPressIconRight}>
              <SImageRight source={iconRight} />
            </STouchRight>
          )}
        </HeaderWrapper>
      )}

      {isExpand && (
        <View style={{ backgroundColor: Colors.colorTab, flex: 1 }}>
          {children}
        </View>
      )}

      {/*{!hideLine && <ViewLineSpace />}*/}
    </SectionContainer>
  );
});

export default SectionContainerStyle;

const SectionContainer = styled.View`
  margin: 16px 16px 0 16px;
  border-radius: 4px;
`;

const SViewTitle = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 8px 16px;
`;

const Title = styled.Text`
  font-family: Roboto-Medium;
  color: ${Colors.colorText};
  font-size: 18px;
`;

const SImageLeft = styled.Image`
  height: 20px;
  width: 20px;
  margin-right: 8px;
  align-self: center;
  tint-color: ${Colors.colorText};
`;

const SImageRight = styled.Image`
  height: 20px;
  width: 20px;
  tint-color: ${Colors.colorText};
`;

const HeaderWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-end;
  background-color: ${Colors.colorBgTitle};
  border-radius: 4px;
`;

const STouchRight = styled.TouchableOpacity`
  padding: 8px 16px;
  border-radius: 4px;
`;
