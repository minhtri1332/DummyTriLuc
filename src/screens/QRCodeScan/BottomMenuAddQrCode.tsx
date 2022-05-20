import React, { memo, useCallback, useState } from "react";
import { styled } from "@/global";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { getBottomSpace, isIphoneX } from "react-native-iphone-x-helper";
import { InputBorder } from "@/componens/ViewBorder/InputBorder";
import {
  BottomMenuContainer,
  BottomMenuHeader,
  BottomMenuModal,
} from "@/componens/BottomMenu";
import ButtonGradient from "@/componens/Gradient/ButtonGradient";

interface Props {
  isShowModalBottom: boolean;
  hideModalBottom: () => void;
  onSave: (value: string) => void;
}

const BottomMenuAddQrCode = memo(
  ({ isShowModalBottom, hideModalBottom, onSave }: Props) => {
    const [code, setCode] = useState("");

    const clearData = useCallback(() => {
      setCode("");
      hideModalBottom();
    }, []);

    const onClose = useCallback(() => {
      clearData();
      hideModalBottom();
    }, [hideModalBottom]);

    const onSaveValue = useCallback(() => {
      onSave && onSave(code);
    }, [onSave, code]);

    return (
      <BottomMenuModal
        isVisible={isShowModalBottom}
        onClose={onClose}
        propagateSwipe={true}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -320}
        >
          <BottomMenuContainer
            containerStyle={{
              paddingBottom: 0,
            }}
          >
            <BottomMenuHeader
              title={"Nhập mã thủ công"}
              onClose={clearData}
              onPressRight={onClose}
            />
            <ScrollView keyboardShouldPersistTaps={"handled"}>
              <InputBorder
                value={code}
                keyName={"1"}
                placeHolder={"Mã của bạn"}
                onTextChange={(keyName, value) => {
                  setCode(value);
                }}
                containerStyle={styles.input}
              />

              <ButtonGradient
                style={{ height: 50, margin: 16 }}
                styleGradient={{ height: 50 }}
                textStyle={{ fontSize: 24 }}
                onPress={onSaveValue}
                label={"Lưu"}
              />
              <View
                style={{
                  height: isIphoneX() ? getBottomSpace() + 10 : 50,
                }}
              />
            </ScrollView>
          </BottomMenuContainer>
        </KeyboardAvoidingView>
      </BottomMenuModal>
    );
  }
);

const ScrollView = styled.ScrollView``;

const styles = StyleSheet.create({
  input: {
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16,
  },
});

export default BottomMenuAddQrCode;
