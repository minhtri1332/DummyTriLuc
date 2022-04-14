import { styled } from "@/global";
import React, { memo, ReactElement, useCallback, useState } from "react";
import { Colors } from "@/themes/Colors";
import { ImageSourcePropType, ViewProps } from "react-native";
import { ViewLineSpace } from "@/common/LineSeperator";

export interface SectionContainerProps extends ViewProps {
  title: string;
  iconElement?: ReactElement;
  iconRight?: ImageSourcePropType;
  children?: ReactElement | ReactElement[];
  rightTitleAction?: string;
  rightAction?: () => void;
  hideLine?: boolean;
}

export const SectionContainerStyle = memo(function SectionContainerStyle({
  title,
  iconElement,
  children,
  hideLine,
  iconRight,
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
            <Title>{title}</Title>
            {iconElement}
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

const SectionContainer = styled.View<{ withDivider: boolean }>`
  margin: 16px;
  border-radius: 4px;
  background-color: ${Colors.white};
`;

const SViewTitle = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-family: Roboto-Medium;
  color: ${Colors.grey1};
  font-size: 18px;
`;

const SImageRight = styled.Image`
  height: 20px;
  width: 20px;
  margin-bottom: 4px;
`;

const HeaderWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-end;
  padding: 16px;
`;

const STouchRight = styled.TouchableOpacity``;
