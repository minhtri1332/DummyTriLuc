import React, { memo, useCallback, useState } from "react";
import SectionContainerStyle from "@/componens/View/SectionView";
import { IC_EDIT_PROFILE, IC_PROFILE } from "@/assets";
import { styled, useAsyncFn } from "@/global";
import { InputBorder } from "@/componens/ViewBorder/InputBorder";
import { StyleSheet } from "react-native";
import TextInputLine from "@/componens/View/TextInputLine";
import { RawProfile } from "@/store/profile/types";
import {
  requestEditProfile,
  requestGetProfile,
} from "@/store/profile/functions";

export const ProfileComponent = memo(function ProfileComponent({
  profile,
}: {
  profile?: RawProfile;
}) {
  const [isEdit, setEdit] = useState(false);
  const [paramProfile, setParamProfile] = useState({
    avatar: profile?.avatar || "",
    height: profile?.height || "",
    weight: profile?.weight || "",
    sex: profile?.sex || "",
    date_of_birth: profile?.date_of_birth || "",
  });

  const setParamCustom = useCallback(
    (keyName: string, value: any) => {
      setParamProfile({
        ...paramProfile,
        [keyName]: value,
      });
    },
    [paramProfile]
  );

  const [{ loading: l, error }, onEditProfile] = useAsyncFn(async () => {
    const profile = await requestEditProfile(paramProfile);
  }, [paramProfile]);

  const goToEdit = useCallback(() => {
    setEdit(!isEdit);
    if (isEdit) {
      onEditProfile().then();
    }
  }, [isEdit, paramProfile]);

  return (
    <SectionContainerStyle
      title={"Hồ sơ"}
      iconLeft={IC_PROFILE}
      iconRight={IC_EDIT_PROFILE}
      rightAction={goToEdit}
      key={1}
    >
      <SViewContent>
        <TextInputLine
          label={"Ngày sinh:"}
          keyName={"date_of_birth"}
          disable={isEdit}
          onChangeText={setParamCustom}
          value={paramProfile.date_of_birth}
        />
        <TextInputLine
          label={"Giới tính:"}
          keyName={"sex"}
          disable={isEdit}
          onChangeText={setParamCustom}
          value={paramProfile.sex}
        />
        <TextInputLine
          label={"Chiều cao:"}
          keyName={"height"}
          disable={isEdit}
          onChangeText={setParamCustom}
          value={String(paramProfile.height)}
        />
        <TextInputLine
          label={"Cân nặng:"}
          keyName={"weight"}
          disable={isEdit}
          onChangeText={setParamCustom}
          value={String(paramProfile.weight)}
        />
      </SViewContent>
    </SectionContainerStyle>
  );
});

const SInputBorder = styled(InputBorder).attrs({
  containerStyle: {
    marginTop: 12,
    marginRight: 16,
    marginLeft: 16,
  },
})``;

const SViewContent = styled.View`
  margin-bottom: 16px;
  border-bottom-left-radius: 4px;
`;

export default ProfileComponent;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
});
