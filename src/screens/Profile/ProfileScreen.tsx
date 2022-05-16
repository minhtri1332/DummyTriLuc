import React, { memo } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { ScreenWrapper } from "@/common/CommonStyles";
import { navigateToProfileScreen } from "@/ultils/navigation";
import Avatar from "@/componens/View/Avatar";
import { styled } from "@/global";
import { Colors } from "@/themes/Colors";
import { useProfile } from "@/store/profile";
import { ProfileComponent } from "@/screens/Profile/components/ProfileComponent";

export const ProfileScreen = memo(function ProfileScreen() {
  const profile = useProfile("0");

  return (
    <ScreenWrapper>
      <DynamicHeader title={"Hồ sơ"} />
      <ScrollView>
        <SViewHeader onPress={navigateToProfileScreen}>
          <Avatar uri={profile?.avatar} size={70} />
          <SText>{profile?.name}</SText>
        </SViewHeader>

        <ProfileComponent profile={profile} />
      </ScrollView>
    </ScreenWrapper>
  );
});

const SViewHeader = styled.TouchableOpacity`
  padding: 16px 0;
`;

const SText = styled.Text`
  align-self: center;
  font-size: 20px;
  padding-top: 8px;
  font-family: Roboto-Medium;
  color: ${Colors.colorText};
`;

export default ProfileScreen;
