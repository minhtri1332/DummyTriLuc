import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Linking, Text } from "react-native";
import React, { memo } from "react";
import { styled } from "@/global";
import { CssImage } from "@/componens/View";
import { IC_EMAIL, IC_USER_Fill } from "@/assets";
import { Colors } from "@/themes/Colors";
import Avatar from "@/componens/View/Avatar";
import { ScreenWrapper } from "@/common/CommonStyles";
import { useProfile } from "@/store/profile";
import {
  navigateToHome,
  navigateToPracticeDetailScreen,
  navigateToProfileScreen,
} from "@/ultils/navigation";

export const CustomDrawerContent = memo(function CustomDrawerContent(props) {
  const profile = useProfile("0");
  return (
    <DrawerContentScrollView
      style={{ backgroundColor: Colors.backgroundColor }}
      {...props}
    >
      <SViewHeader
        disabled={profile?.name === "Guest"}
        onPress={navigateToProfileScreen}
      >
        <Avatar uri={profile?.avatar} />
        <SText>{profile?.name}</SText>
      </SViewHeader>
      {/*<DrawerItemList {...props} />*/}
      <DrawerItem
        label="Home"
        inactiveTintColor={Colors.colorText}
        activeBackgroundColor={Colors.colorTab}
        onPress={navigateToHome}
      />
    </DrawerContentScrollView>
  );
});

const SText = styled.Text`
  align-self: center;
  font-size: 20px;
  padding-top: 8px;
  font-family: Roboto-Medium;
  color: ${Colors.colorText};
`;

const SViewHeader = styled.TouchableOpacity`
  border-bottom-width: 1px;
  padding: 16px 0;
  border-color: ${Colors.grey4};
`;
