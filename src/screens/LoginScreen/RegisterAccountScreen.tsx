import React, { memo, useCallback, useState } from "react";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { ScreenWrapper } from "@/common/CommonStyles";
import { InputBorder } from "@/componens/ViewBorder/InputBorder";
import { styled, useAsyncFn } from "@/global";
import SubmitButtonColor from "@/componens/Button/ButtonSubmit";
import { requestRegister } from "@/store/auth/function";

export interface ParamCreateAccount {
  full_name: string;
  email: string;
  password: string;
  re_password: string;
}

export const RegisterAccountScreen = memo(function RegisterAccountScreen() {
  const [paramCustomer, setParamCustomer] = useState<ParamCreateAccount>({
    full_name: "Nguyen Van Bee",
    email: "",
    password: "Password#1",
    re_password: "Password#1",
  });

  const setParamCustom = useCallback(
    (keyName: string, value: any) => {
      setParamCustomer({
        ...paramCustomer,
        [keyName]: value,
      });
    },
    [paramCustomer]
  );

  const [{ loading }, requestRegisterAccount] = useAsyncFn(async () => {
    await requestRegister(paramCustomer);
  }, [paramCustomer]);

  return (
    <ScreenWrapper>
      <DynamicHeader title={"Tạo tài khoản"} />
      <SInputBorder
        value={paramCustomer.full_name}
        keyName={"full_name"}
        onTextChange={setParamCustom}
        placeHolder={"Họ và tên"}
      />
      <SInputBorder
        value={paramCustomer.email}
        keyName={"email"}
        onTextChange={setParamCustom}
        keyboardType={"email-address"}
        placeHolder={"Nhập email"}
      />
      <SInputBorder
        value={paramCustomer.password}
        keyName={"password"}
        onTextChange={setParamCustom}
        keyboardType={"email-address"}
        placeHolder={"Nhập mật khẩu"}
        secureTextEntry={true}
        textContentType="password"
      />
      <SInputBorder
        value={paramCustomer.re_password}
        keyName={"re_password"}
        onTextChange={setParamCustom}
        keyboardType={"email-address"}
        placeHolder={"Nhập lại mật khẩu"}
      />

      <SubmitButtonColor
        loading={loading}
        title={"Tạo tài khoản"}
        onPress={requestRegisterAccount}
      />
    </ScreenWrapper>
  );
});

const SInputBorder = styled(InputBorder).attrs({
  containerStyle: {
    marginTop: 12,
    marginRight: 16,
    marginLeft: 16,
  },
})``;
export default RegisterAccountScreen;
