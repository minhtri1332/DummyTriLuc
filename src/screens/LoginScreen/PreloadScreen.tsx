import React, { memo, useEffect } from "react";
import {
  ActivityIndicator,
  InteractionManager,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavigationService from "@/services/NavigationService";
import { ScreenWrapper } from "@/common/CommonStyles";
import { LoginForm, updateToken } from "@/screens/LoginScreen/LoginForm";
import {
  fontTabletScale,
  FORM_WIDTH,
  fScale,
  fTabletScale,
  screenShortDimension,
} from "@/ultils/scale";
import { styled, useAsyncFn } from "@/global";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { isTablet } from "react-native-device-info";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { useSetupLanguage } from "@/languages";
import { IMG_LOGIN_THEME } from "@/assets";
import { Logo } from "@/screens/LoginScreen/components/Logo";
import { Colors } from "@/themes/Colors";
import { BaseOpacityButton } from "@/componens/Button/ButtonCustom";
import { requestLogin, requestLoginGuest } from "@/store/auth/function";
import LocalStorageHelper from "@/services/LocalServiceHelper";
import { navigateToHome } from "@/ultils/navigation";
import useAutoToastError from "@/hooks/useAutoToastError";

const HEIGHT_IN_PORTRAIT = isTablet()
  ? fScale(80)
  : screenShortDimension <= 320
  ? 13
  : 43;

export const PreloadScreen = memo(function PreloadScreen() {
  const orientation = useDeviceOrientation();
  useSetupLanguage();
  const navigation: any = useNavigation();
  useEffect(() => {
    NavigationService.navigator = navigation;
  }, [navigation]);

  const [{ loading, error }, startLoginByGuest] = useAsyncFn(async () => {
    InteractionManager.runAfterInteractions(() => {
      Keyboard.dismiss();
    });

    const response = await requestLoginGuest();
    if (response) {
      await updateToken();
      navigateToHome();
    }
  }, []);

  useAutoToastError(error);
  return (
    <ScreenWrapper>
      <SImageBackground resizeMode={"cover"} source={IMG_LOGIN_THEME} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={-100}
          behavior={"position"}
        >
          <UpperContainer>
            <Spacer landscape={orientation.landscape} />
            <Logo />
            <Spacer landscape={orientation.landscape} />

            <LoginForm />
          </UpperContainer>

          <SText>Hoặc</SText>
          <LoginButton onPress={startLoginByGuest}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <LoginText>{"Đăng nhập bởi khách"}</LoginText>
            )}
          </LoginButton>
        </KeyboardAvoidingView>
      </ScrollView>
    </ScreenWrapper>
  );
});

export default PreloadScreen;

const SText = styled.Text`
  font-size: ${fontTabletScale(15)}px;
  color: #fff;
  justify-content: center;
  align-self: center;
  align-items: center;
  margin-bottom: 16px;
`;

const LoginText = styled.Text`
  font-size: ${fontTabletScale(18)}px;
  color: #fff;
  font-family: Roboto-Medium;
`;

const RoundedButton = styled(BaseOpacityButton)`
  width: ${fTabletScale(FORM_WIDTH)}px;
  height: ${fTabletScale(24) * 2}px;
  border-radius: ${fTabletScale(4)}px;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled(RoundedButton)`
  margin-bottom: ${fScale(16) + getBottomSpace()}px;
  border-width: 1px;
  border-color: ${Colors.white};
`;

const SImageBackground = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const UpperContainer = styled.View`
  width: 100%;
  align-items: center;
  flex: 1;
`;

const Spacer = styled.View<{ landscape: boolean }>`
  height: ${() =>
    HEIGHT_IN_PORTRAIT +
    (Platform.OS === "ios" ? getStatusBarHeight(true) : 0)}px;
  width: 100%;
`;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    alignItems: "center",
    flex: 1,
  },
  indicatorContainer: {
    width: "100%",
    marginTop: fTabletScale(42),
  },
});
