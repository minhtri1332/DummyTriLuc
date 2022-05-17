import React, { memo, useCallback, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { ScreenWrapper } from "@/common/CommonStyles";
import { navigateToProfileScreen } from "@/ultils/navigation";
import Avatar from "@/componens/View/Avatar";
import { styled, useAsyncFn } from "@/global";
import { Colors } from "@/themes/Colors";
import { useProfile } from "@/store/profile";
import { ProfileComponent } from "@/screens/Profile/components/ProfileComponent";
import PickImageModalComponent from "@/screens/Profile/components/PickImageModalComponent";
import { requestEditProfile } from "@/store/profile/functions";
import useAutoToastError from "@/hooks/useAutoToastError";

export const ProfileScreen = memo(function ProfileScreen() {
  const profile = useProfile("0");

  const [{ loading: l, error }, onEditAvatar] = useAsyncFn(
    async (keyName: string, value: any) => {
      const params = {
        avatar: value,
        height: profile?.height || "",
        weight: profile?.weight || "",
        sex: profile?.sex || "",
        date_of_birth: profile?.date_of_birth || "",
      };
      await requestEditProfile(params);
    },
    []
  );

  useAutoToastError(error);
  return (
    <ScreenWrapper>
      <DynamicHeader title={"Hồ sơ"} />
      <ScrollView>
        <PickImageModalComponent
          imageDefault={profile?.avatar}
          onImageCallback={onEditAvatar}
          keyName={"avatar"}
        />
        <SText>{profile?.name}</SText>

        <ProfileComponent profile={profile} />
      </ScrollView>
    </ScreenWrapper>
  );
});

const SText = styled.Text`
  align-self: center;
  font-size: 20px;
  font-family: Roboto-Medium;
  color: ${Colors.colorText};
`;

export default ProfileScreen;
