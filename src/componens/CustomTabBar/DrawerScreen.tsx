import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React, { memo, useCallback } from "react";
import { styled } from "@/global";
import { Colors } from "@/themes/Colors";
import Avatar from "@/componens/View/Avatar";
import { useProfile } from "@/store/profile";
import {
  navigateToHome,
  navigateToLogin,
  navigateToProfileScreen,
} from "@/ultils/navigation";
import { logout } from "@/ultils/fetch";
import { useDispatch } from "react-redux";
import DeviceInfo from "react-native-device-info";

export const CustomDrawerContent = memo(function CustomDrawerContent(props) {
  const profile = useProfile("0");
  const dispatch = useDispatch();
  const buildVersion = DeviceInfo.getVersion();

  const onPressLogout = useCallback(async () => {
    await logout(dispatch);
  }, [dispatch]);

  return (
    <SViewContainer>
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
      <STextVersion>Phiên bản: {buildVersion}</STextVersion>
      <STouchableOpacity onPress={onPressLogout}>
        <STextLogout>Đăng xuất</STextLogout>
      </STouchableOpacity>
    </SViewContainer>
  );
});

const SViewContainer = styled.View`
  flex: 1;
  background-color: ${Colors.backgroundColor};
`;
const STouchableOpacity = styled.TouchableOpacity`
  height: 70px;
  border-top-width: 1px;
  border-top-color: ${Colors.grey4};
  justify-content: center;
  align-items: center;
  background-color: ${Colors.grey7};
`;

const STextLogout = styled.Text`
  align-self: center;
  font-size: 19px;
  padding-bottom: 8px;
  font-family: Roboto-Medium;
  color: ${Colors.red1};
`;

const SText = styled.Text`
  align-self: center;
  font-size: 20px;
  padding-top: 8px;
  font-family: Roboto-Medium;
  color: ${Colors.colorText};
`;

const STextVersion = styled.Text`
  align-self: center;
  font-size: 14px;
  padding-bottom: 8px;
  color: ${Colors.colorText};
`;

const SViewHeader = styled.TouchableOpacity`
  border-bottom-width: 1px;
  padding: 16px 0;
  border-color: ${Colors.grey4};
`;
