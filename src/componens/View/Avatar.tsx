import React, { memo } from "react";
import { CssImage } from "@/componens/View/index";
import { IC_USER_Fill } from "@/assets";
import { Colors } from "@/themes/Colors";
import { styled } from "@/global";

interface Props {
  uri?: string;
  size?: number;
}

const Avatar = memo(({ uri, size }: Props) => {
  return (
    <>
      {uri ? (
        <CssImage
          source={{ uri: uri }}
          size={size ? size : 70}
          tintColor={Colors.grey4}
        />
      ) : (
        <SViewAvatar size={size ? size + 50 : 70}>
          <CssImage
            source={IC_USER_Fill}
            size={size ? size : 40}
            tintColor={Colors.grey4}
          />
        </SViewAvatar>
      )}
    </>
  );
});

export default Avatar;

const SViewAvatar = styled.View<{ size: number }>`
  background-color: ${Colors.grey5};
  width: ${(props) => (props.size ? props.size : 70)}px;
  height: ${(props) => (props.size ? props.size : 70)}px;
  border-radius: ${(props) => (props.size ? props.size : 40)}px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;
