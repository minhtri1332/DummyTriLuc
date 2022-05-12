import React, { memo, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  InteractionManager,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { styled, useAsyncFn } from "@/global";

import { IC_CLOSE_EYE, IC_EMAIL, IC_OPEN_EYE, IC_PASSWORD } from "@/assets";
import {
  fontTabletScale,
  FORM_WIDTH,
  fScale,
  fTabletScale,
} from "@/ultils/scale";
import { Colors } from "@/themes/Colors";
import { LeftIconInput } from "@/screens/LoginScreen/components/LeftIconInput";
import { isTablet } from "react-native-device-info";
import { BaseOpacityButton } from "@/componens/Button/ButtonCustom";
import {
  navigateToHome,
  navigateToRegisterAccountScreen,
} from "@/ultils/navigation";
import { requestLogin, requestTokenDevice } from "@/store/auth/function";
import LocalStorageHelper from "@/services/LocalServiceHelper";
import messaging from "@react-native-firebase/messaging";
import { ParamCreateAccount } from "@/screens/LoginScreen/RegisterAccountScreen";
import FirebaseTokenService from "@/services/FirebaseTokenService";
import useAutoToastError from "@/hooks/useAutoToastError";

const RoundedButton = styled(BaseOpacityButton)`
  width: ${fTabletScale(FORM_WIDTH)}px;
  height: ${fTabletScale(24) * 2}px;
  border-radius: ${fTabletScale(4)}px;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled(RoundedButton)`
  margin-top: ${fScale(16)}px;
  background-color: ${Colors.red1};
`;
const LoginText = styled.Text`
  font-size: ${fontTabletScale(15)}px;
  color: #fff;
  font-family: Roboto-Medium;
`;

const Container = styled.View`
  width: ${fTabletScale(FORM_WIDTH)}px;
  padding: 16px 0px;
`;

export const LoginForm = memo(() => {
  // test3@gmail.com
  // Password#1
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onTextChange = useCallback((keyname: string, value: string) => {
    if (keyname == "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  }, []);

  const fillUser = useCallback(async () => {
    const email = await LocalStorageHelper.get("username");
    const pass = await LocalStorageHelper.get("password");

    if (email) {
      onTextChange("username", String(email));
    }

    if (pass) {
      onTextChange("password", String(pass));
    }
  }, []);

  useEffect(() => {
    fillUser().then();
  }, []);

  const onSubmit = useCallback(async () => {
    Keyboard.dismiss();
    await startLogin();
  }, [email, password]);

  const eventRegister = useCallback(
    async (data: ParamCreateAccount) => {
      setUsername(data.email);
      setPassword(data.password);
    },
    [setUsername, setPassword]
  );

  const goToRegister = useCallback(async () => {
    navigateToRegisterAccountScreen({ eventRegister });
  }, [eventRegister]);

  const [{}, updateToken] = useAsyncFn(async () => {
    await messaging().registerDeviceForRemoteMessages();

    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }

    const tokenDevice = await messaging().getToken();
    console.log("tokenDevice", tokenDevice);
    await requestTokenDevice(tokenDevice);
    await FirebaseTokenService.change(tokenDevice);
  }, []);

  const [{ loading, error }, startLogin] = useAsyncFn(async () => {
    InteractionManager.runAfterInteractions(() => {
      Keyboard.dismiss();
    });

    const response = await requestLogin(email, password);

    if (response) {
      await updateToken();
      await LocalStorageHelper.set("username", email);
      await LocalStorageHelper.set("password", password);
      navigateToHome();
    }
  }, [email, password]);

  useAutoToastError(error);
  return (
    <Container>
      <Text style={styles.textLabel}>Email</Text>
      <LeftIconInput
        keyboardType={
          Platform.OS === "android" ? "email-address" : "ascii-capable"
        }
        containerStyle={StyleSheet.flatten([
          styles.inputContainer,
          styles.emailInputContainer,
        ])}
        value={email}
        onChangeText={setUsername}
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        inputStyle={styles.inputStyle}
        leftIconContainerStyle={styles.leftIconContainerStyle}
        leftIcon={
          <Image resizeMode="contain" style={styles.icon} source={IC_EMAIL} />
        }
      />
      <Text style={styles.textLabel}>Password</Text>
      <LeftIconInput
        containerStyle={styles.inputContainer}
        textContentType="password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        placeholder={"Password"}
        autoCapitalize="none"
        autoCorrect={false}
        inputStyle={styles.inputStyle}
        leftIconContainerStyle={styles.leftIconContainerStyle}
        rightIcon={
          <TouchableOpacity
            style={styles.buttonShowPass}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              resizeMode="contain"
              style={styles.icon}
              source={!showPassword ? IC_CLOSE_EYE : IC_OPEN_EYE}
            />
          </TouchableOpacity>
        }
        leftIcon={
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={IC_PASSWORD}
          />
        }
      />

      <LoginButton onPress={onSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <LoginText>{"Login"}</LoginText>
        )}
      </LoginButton>
      <STouchableOpacity onPress={goToRegister}>
        <Text style={styles.textLabel}>Tạo tài khoản</Text>
      </STouchableOpacity>
    </Container>
  );
});

const STouchableOpacity = styled.TouchableOpacity`
  align-self: flex-end;
  padding: 16px;
`;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    padding: 0,
    marginBottom: isTablet() ? fScale(25) : 16,
    flexDirection: "row",
    borderWidth: 1,
    paddingLeft: 16,
    backgroundColor: Colors.hint,
    alignItems: "center",
  },
  emailInputContainer: {
    marginTop: 0,
  },
  inputStyle: {
    fontSize: fontTabletScale(14),
    color: Colors.white,
  },
  leftIconContainerStyle: {
    marginLeft: 0,
    marginRight: 13,
  },
  icon: {
    width: fTabletScale(18),
    height: fTabletScale(18),
    tintColor: Colors.white,
  },
  buttonShowPass: {
    padding: 14,
  },
  textLabel: {
    fontSize: fTabletScale(13),
    color: Colors.white,
    marginBottom: 6,
  },
});
