import React, { memo, useCallback, useState } from "react";
import { ScreenWrapper } from "@/common/CommonStyles";
import { styled, useAsyncFn } from "@/global";
import {
  BottomMenuContainer,
  BottomMenuHeader,
  BottomMenuModal,
} from "@/componens/BottomMenu";
import {
  InteractionManager,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { screenShortDimension } from "@/ultils/scale";
import {
  IMG_BACKGROUND_ACCORDING_LED,
  IMG_BACKGROUND_FREE_FIGHT,
} from "@/assets";
import { Colors } from "@/themes/Colors";
import ToastService from "@/services/ToastService";
import MachineIdService from "@/services/MachineIdService";
import { requestConnectMachineHitMode } from "@/store/mechine/function";
import { navigateToPracticingScreen } from "@/ultils/navigation";
import { InputBorder } from "@/componens/ViewBorder/InputBorder";

interface BottomMenuAddQrCodeProps {
  isVisible: boolean;
  hideMenu: () => void;
}

export const BottomMenuAddQrCode = memo(function BottomMenuAddQrCode({
  isVisible,
  hideMenu,
}: BottomMenuAddQrCodeProps) {
  const [code, setCode] = useState("nodeesp32");

  const onPressAccordingLed = useCallback(() => {}, []);

  return (
    <BottomMenuModal
      isVisible={isVisible}
      onClose={hideMenu}
      propagateSwipe={true}
    >
      <BottomMenuContainer>
        <BottomMenuHeader
          noDivider={true}
          title={"Chọn kiểu đánh"}
          onClose={hideMenu}
          onPressRight={hideMenu}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScreenWrapper></ScreenWrapper>
        </KeyboardAvoidingView>
      </BottomMenuContainer>
    </BottomMenuModal>
  );
});

export default BottomMenuAddQrCode;

const SInputBorder = styled(InputBorder).attrs({
  containerStyle: {
    flex: 1,
    marginTop: 12,
    marginRight: 16,
    marginLeft: 16,
  },
})``;
