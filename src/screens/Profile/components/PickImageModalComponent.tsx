import React, { memo, useCallback, useEffect, useState } from "react";
import { styled } from "@/global";
import { Colors } from "@/themes/Colors";
// @ts-ignore
import RNFetchBlob from "rn-fetch-blob";
import useBoolean from "@/hooks/useBoolean";
import ImageResizer from "react-native-image-resizer";
import { FileType } from "@/screens/Profile/types";
import { IC_USER_Fill } from "@/assets";
import PickFileActionsSheet from "@/componens/PickFileActionsSheet";
import { TakeCameraOptions } from "@/componens/PickFileActionsSheet/file";
import { InteractionManager } from "react-native";

interface ImageParams {
  onImageCallback: (keyName: string, value: any) => void;
  imageDefault?: string;
  keyName: string;
}

export const takeCameraOptions: TakeCameraOptions = {
  mediaType: "photo",
  forceJpg: true,
};

export const PickImageModalComponent = memo(function PickImageModalComponent({
  onImageCallback,
  imageDefault,
  keyName,
}: ImageParams) {
  const [avatar, setAvatar] = useState(imageDefault);
  const [isFilePickerVisible, showFilePicker, hideFilePicker] = useBoolean();
  useEffect(() => {
    setAvatar(imageDefault);
  }, [imageDefault]);

  const fileCallback = useCallback(
    (files: FileType[]) => {
      hideFilePicker();
      setAvatar(files[0].uri);

      ImageResizer.createResizedImage(files[0].uri, 1000, 1000, "JPEG", 10, 0)
        .then((response) => {
          const image = {
            ...files[0],
            path: response.uri,
            uri: response.uri,
          };
          setTimeout(() => {
            onImageCallback(keyName, image);
          }, 200);
        })
        .catch((err) => {
          // Oops, something went wrong. Check that the filename is correct and
          // inspect err to get more details.
        });
    },
    [onImageCallback, keyName]
  );

  return (
    <SViewContainer>
      <SViewAvatar onPress={showFilePicker}>
        <SImage
          source={avatar === "" ? IC_USER_Fill : { uri: avatar }}
          resizeMode={"cover"}
          size={avatar === "" ? 24 : 120}
        />
        {avatar === "" && <SText>Thêm ảnh đại diện</SText>}
      </SViewAvatar>

      <PickFileActionsSheet
        isVisible={isFilePickerVisible}
        onCloseRequest={hideFilePicker}
        onFilePicked={fileCallback}
        pickFileOptions={{ multiple: false }}
        pickImageOptions={{ multiple: false }}
        takeCameraOptions={takeCameraOptions}
        includeTakeCamera={true}
      />
    </SViewContainer>
  );
});

export const SImage = styled.Image<{ size?: number; tintColor?: string }>`
  width: ${(props: any) => props.size || 24};
  height: ${(props: any) => props.size || 24};
  border-radius: 80px;
`;

const SText = styled.Text`
  text-align: center;
  font-size: 13px;
  margin: 8px 16px;
  color: ${Colors.grey6};
`;

const SViewContainer = styled.View``;

const SViewAvatar = styled.TouchableOpacity`
  height: 120px;
  width: 120px;
  border-width: 1px;
  border-color: ${Colors.grey4};
  align-self: center;
  justify-content: center;
  align-items: center;
  margin: 16px;
  border-radius: 80px;
`;

export default PickImageModalComponent;
