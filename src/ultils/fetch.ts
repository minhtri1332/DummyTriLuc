import axios from "axios";
import { Alert } from "react-native";
import ToastService from "@/services/ToastService";
import LocalStorageHelper from "@/services/LocalServiceHelper";
import messaging from "@react-native-firebase/messaging";
import { navigateToLogin } from "@/ultils/navigation";

const headers = {
  Authorization: "",
};

export const Fetch = axios.create({ baseURL: "", headers }); // baseURL: Core.baseUrl

Fetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    ToastService.showError(
      error.response.data?.error_message || "",
      true,
      true,
      ""
    );

    // if (error.response.status === 500) {
    //   // ToastService.showError(error.response.data.message, true, true, '');
    //   return error.response.data;
    // }
    //
    // if (error.response.status === 400) {
    //   if (error.response.data.message === "Mã lỗi #10000") {
    //     return error.response.data;
    //   }
    //   return error.response.data;
    // }
    if (error.response.status === 401) {
      // setTokenAction('');
      //  navigateToLoginScreen();
      updateFetchToken("");
      // setUserAction(null);
      Alert.alert("Token error", "Please login again");
      return error.response.data;
    }
    return Promise.resolve({ error });
  }
);

export const updateFetchToken = (_token: string) => {
  // @ts-ignore
  Fetch.defaults.headers["Authorization"] = `${_token}`;
};

export const logout = async (dispatch: any) => {
  // @ts-ignore
  Fetch.defaults.headers["Authorization"] = "";
  await LocalStorageHelper.set("password", "");
  await messaging().deleteToken();
  dispatch({ type: "RESET_STORE_DATA" });
  navigateToLogin();
  ToastService.show("Đăng xuất thành công");
};
