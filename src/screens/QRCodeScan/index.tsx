import React, { memo, useCallback, useState } from "react";
import { ScreenWrapper } from "@/common/CommonStyles";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import QRCodeScanner from "react-native-qrcode-scanner";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { styled } from "@/global";
import { IC_BG_QR_SCAN } from "@/assets";
import { Colors } from "@/themes/Colors";
import { InputBorder } from "@/componens/ViewBorder/InputBorder";
import { BaseOpacityButton } from "@/componens/Button/ButtonCustom";
import SubmitButtonColor from "@/componens/Button/ButtonSubmit";
import { requestConnectMachine } from "@/store/mechine/function";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export const QRCodeScanScreen = memo(function QRCodeScanScreen() {
  const [code, setCode] = useState("");

  const onSuccess = (e) => {
    console.log("s", e);
  };

  const makeSlideOutTranslation = (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18,
      },
      to: {
        [translationType]: fromValue,
      },
    };
  };

  const sendData = useCallback(() => {
    requestConnectMachine(code).then();
  }, [code]);

  return (
    <ScreenWrapper>
      <DynamicHeader title={"QR"} />
      <View style={{ flexDirection: "row", marginBottom: 8 }}>
        <SInputBorder
          value={code}
          keyName={"full_name"}
          onTextChange={setCode}
          placeHolder={"machine id"}
        />
        <SubmitButtonColor
          style={{ paddingLeft: 16, paddingRight: 16 }}
          title={"Send"}
          onPress={sendData}
        />
      </View>
      <QRCodeScanner
        onRead={onSuccess}
        fadeIn={true}
        showMarker={true}
        cameraStyle={{ height: SCREEN_HEIGHT }}
        markerStyle={{ borderColor: Colors.white, borderWidth: 1 }}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
              <Text style={{ fontSize: 30, color: "white" }}>
                {/*QR CODE SCANNER*/}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle}>
                {/*<Icon*/}
                {/*    name="ios-qr-scanner"*/}
                {/*    size={SCREEN_WIDTH * 0.73}*/}
                {/*    color={iconScanColor}*/}
                {/*/>*/}
                <SImage source={IC_BG_QR_SCAN}></SImage>
                <Animatable.View
                  style={styles.scanBar}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={1700}
                  easing="linear"
                  animation={makeSlideOutTranslation(
                    "translateY",
                    SCREEN_WIDTH * -0.54
                  )}
                />
              </View>

              <View style={styles.leftAndRightOverlay} />
            </View>

            <View style={styles.bottomOverlay} />
          </View>
        }
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
      />

      {/*<BaseOpacityButton*/}
      {/*  onPress={() => {*/}
      {/*    console.log("ok");*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Text>asdsa</Text>*/}
      {/*</BaseOpacityButton>*/}
    </ScreenWrapper>
  );
});

const STextHeader = styled.Text`
  flex: 1;
  margin-top: 24px;
  font-size: 18px;
`;

const SImage = styled.Image`
  width: ${SCREEN_WIDTH * 0.6};
  height: ${SCREEN_WIDTH * 0.6};
  tint-color: ${Colors.white};
`;

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

const SInputBorder = styled(InputBorder).attrs({
  containerStyle: {
    flex: 1,
    marginTop: 12,
    marginRight: 16,
    marginLeft: 16,
  },
})``;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center",
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },
});

export default QRCodeScanScreen;
