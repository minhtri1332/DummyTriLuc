import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Linking } from "react-native";
import React, { memo } from "react";
import { styled } from "@/global";
import { CssImage } from "@/componens/Icons";
import { IC_EMAIL } from "@/assets";

export const CustomDrawerContent = memo(function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SViewHeader>
        <CssImage source={IC_EMAIL} size={24} />
      </SViewHeader>
      {/*<DrawerItemList {...props} />*/}
      <DrawerItem
        label="Help"
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
      />
    </DrawerContentScrollView>
  );
});

const SViewHeader = styled.View`
  background-color: coral;
  height: 50px;
`;
