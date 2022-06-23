import React, { memo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { ScreenWrapper } from "@/common/CommonStyles";
import { styled, useAsyncFn } from "@/global";
import { Colors } from "@/themes/Colors";
import { useProfile } from "@/store/profile";
import { ProfileComponent } from "@/screens/Profile/components/ProfileComponent";
import PickImageModalComponent from "@/screens/Profile/components/PickImageModalComponent";
import { requestEditProfile } from "@/store/profile/functions";
import useAutoToastError from "@/hooks/useAutoToastError";
import ToastService from "@/services/ToastService";

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
      ToastService.show("Đổi avatar thành công");
    },
    [profile]
  );

  useAutoToastError(error);
  return (
    <ScreenWrapper>
      <DynamicHeader title={"Hồ sơ"} />
      <KeyboardAvoidingView
        style={styles.search}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView style={styles.maxHeightScroll}>
          <PickImageModalComponent
            imageDefault={profile?.avatar}
            onImageCallback={onEditAvatar}
            keyName={"avatar"}
          />
          <SText>{profile?.name}</SText>

          <ProfileComponent profile={profile} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
});

const SText = styled.Text`
  align-self: center;
  font-size: 20px;
  font-family: Roboto-Medium;
  color: ${Colors.colorText};
`;

const styles = StyleSheet.create({
  maxHeightScroll: {
    maxHeight: "100%",
  },
  search: {
    flex: 1,
  },
});

export default ProfileScreen;
