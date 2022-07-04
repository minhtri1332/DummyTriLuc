import { Platform } from "react-native";

export const Fonts = {
  anton: Platform.OS === "ios" ? "anton-regular" : "anton_regular",
  metrophobic:
    Platform.OS === "ios" ? "metrophobic-regular" : "metrophobic_regular",
  roboto_bold: "Roboto-Bold",
};
