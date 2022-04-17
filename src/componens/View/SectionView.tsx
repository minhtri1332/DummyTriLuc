import { styled } from "@/global";
import React, { memo, ReactElement, useCallback, useState } from "react";
import { Colors } from "@/themes/Colors";
import { ImageSourcePropType, ViewProps } from "react-native";
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
}: SectionContainerProps) {
  const [isExpand, setExpand] = useState(true);
  const onPress = useCallback(() => {
    setExpand(!isExpand);
  }, [isExpand]);

  return (
    <SectionContainer>
      {title !== "" && (
        <HeaderWrapper onPress={onPress}>
          <SViewTitle>
            {iconLeft && <SImageLeft source={iconLeft} />}
            <Title>{title}</Title>
          </SViewTitle>

          {iconRight && (
            <STouchRight>
              <SImageRight source={iconRight} />
            </STouchRight>
          )}
        </HeaderWrapper>
      )}
      {isExpand && children}
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
`;

const Title = styled.Text`
  font-family: Roboto-Medium;
  color: ${Colors.colorText};
  font-size: 18px;
`;

const SImageLeft = styled.Image`
  height: 18px;
  width: 20px;
  margin-right: 8px;
  margin-bottom: 4px;
  tint-color: ${Colors.colorText};
`;

const SImageRight = styled.Image`
  height: 20px;
  width: 20px;
  margin-bottom: 4px;
  tint-color: ${Colors.colorText};
`;

const HeaderWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-end;
  padding: 8px 16px;
  background-color: ${Colors.colorBgTitle};
`;

const STouchRight = styled.TouchableOpacity``;
