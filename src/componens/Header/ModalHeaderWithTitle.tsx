import React, { FunctionComponent, useCallback } from "react";
import {
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useNavigation } from "@/global";
import { IC_CLOSE } from "@/assets";
import {ModalHeader} from "@/componens/Header/ModalHeader";
import {ModalHeaderTitle} from "@/componens/Header/ModalHeaderTitle";
import {Colors} from "@/themes/Colors";

interface OwnProps {
  goBack?: () => void;
  title?: string;
  noTranslateTitle?: string;
  hideSeparator?: boolean | false;
  smallText?: boolean;
  placement?: "center" | "left" | "right";
  containerStyle?: ViewStyle;
  backgroundColor?: string;
  titleStyle?: TextStyle;
  iconCloseStyle?: ImageStyle;
}

type Props = OwnProps;

interface NavCloseButtonProps {
  onPress?: () => void;
  style?: ImageStyle;
}

export const NavCloseButton = React.memo(
  ({ onPress, style }: NavCloseButtonProps) => {
    return (
      <TouchableOpacity style={styles.navMoreIconContainer} onPress={onPress}>
        <Image
          style={[styles.icon, style]}
          source={IC_CLOSE}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }
);

const ModalHeaderWithTitle: FunctionComponent<Props> = (props) => {
  const {
    goBack,
    title,
    noTranslateTitle,
    hideSeparator,
    smallText,
    placement,
    containerStyle,
    backgroundColor,
    titleStyle,
    iconCloseStyle,
  } = props;
  const navigation = useNavigation();

  const _goBack = useCallback(() => {
    if (goBack) {
      goBack();
      return;
    }
    navigation.canGoBack() && navigation.goBack();
  }, []);

  return (
    <ModalHeader
      children={null}
      containerStyle={[
        styles.defaultModalHeader,
        hideSeparator ? { borderBottomWidth: 0 } : {},
        containerStyle,
      ]}
      statusBarProps={{
        barStyle: "light-content",
      }}
      placement={placement || "center"}
      backgroundColor={backgroundColor}
      centerComponent={
        <ModalHeaderTitle
          title={title}
          noTranslateTitle={noTranslateTitle}
          smallText={smallText}
          placement={placement || "center"}
          style={titleStyle}
        />
      }
      rightComponent={
        <View style={styles.normalContainer}>
          <NavCloseButton style={iconCloseStyle} onPress={_goBack} />
        </View>
      }
    />
  );
};

const MemoModalHeaderWithTitle = React.memo(ModalHeaderWithTitle);

export { MemoModalHeaderWithTitle as ModalHeaderWithTitle };

const styles = StyleSheet.create({
  noSeparator: {
    borderBottomWidth: 0,
  },
  normalContainer: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  navMoreIconContainer: {
    marginRight: 10,
  },
  defaultModalHeader: {
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0,
  },
  icon: {
    tintColor: Colors.colorText,
  },
});
