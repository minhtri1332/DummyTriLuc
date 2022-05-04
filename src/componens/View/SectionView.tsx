import { styled } from "@/global";
import React, { memo, ReactElement, useCallback, useState } from "react";
import { Colors } from "@/themes/Colors";
import { ImageSourcePropType, View, ViewProps } from "react-native";
import { ViewLineSpace } from "@/common/LineSeperator";

export interface SectionContainerProps extends ViewProps {
  title: string;
  iconLeft?: ImageSourcePropType;
  iconRight?: ImageSourcePropType;
  children?: ReactElement | ReactElement[];
  rightTitleAction?: string;
  rightAction?: () => void;
  hideLine?: boolean;
}

export const SectionContainerStyle = memo(function SectionContainerStyle({
  title,
  children,
  hideLine,
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
    <SectionContainer key={title}>
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
      <View style={{ backgroundColor: Colors.colorTab, flex: 1 }}>
        {isExpand && children}
      </View>

      {!hideLine && <ViewLineSpace />}
    </SectionContainer>
  );
});

export default SectionContainerStyle;

const SectionContainer = styled.View`
  margin: 16px 16px 0px 16px;
  border-radius: 4px;
  background-color: ${Colors.colorTab};
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
  width: 22px;
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
  background-color: #00008b;
  padding: 8px 16px;
  border-radius: 4px;
`;
