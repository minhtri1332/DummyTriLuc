import React, { memo, useMemo } from "react";
import { ImageSourcePropType } from "react-native";
import styled from "styled-components/native";
import Avatar from "@/componens/View/Avatar";
import { IC_FILE_AI } from "@/assets";
const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Icon = styled.Image<{ size: number }>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  bottom: -8px;
  z-index: 1;
`;

const ViewAvatar = styled.View<{ size: number }>`
  width: ${(p) => p.size + 2}px;
  height: ${(p) => p.size + 2}px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: ${(p) => (p.size + 2) / 2};
`;

const Total = styled.Text`
  position: absolute;
  bottom: 0;
  align-self: center;
`;
interface Props {
  icon: ImageSourcePropType;
  size: number;
  iconSize: number;
  userId: string;
  year: string;
}

export const CupInfo = memo(function CupInfo(props: Props) {
  const { icon, size, iconSize, userId, year } = props;

  const total = useMemo(() => {
    return "total";
  }, [year]);

  return (
    <Container>
      <Icon source={icon} size={iconSize} />
      <ViewAvatar size={size}>
        <Avatar
          uri={
            "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
          }
          size={size}
        />
      </ViewAvatar>
      <Total>{total}</Total>
    </Container>
  );
});
