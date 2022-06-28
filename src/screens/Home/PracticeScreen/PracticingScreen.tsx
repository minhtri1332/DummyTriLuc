import React, { memo, useCallback, useRef, useState } from "react";
import { ScreenWrapper } from "@/common/CommonStyles";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { styled, useAsyncFn } from "@/global";
import GradientButton from "@/componens/Gradient/ButtonGradient";
import MachineIdService from "@/services/MachineIdService";
import { requestConnectMachineHitMode } from "@/store/mechine/function";
import { RNCamera } from "react-native-camera";
// @ts-ignore
import RNVideoHelper from "react-native-video-helper";
import RNFS from "react-native-fs";
import { createThumbnail } from "react-native-create-thumbnail";
// @ts-ignore
import { Stopwatch, Timer } from "react-native-stopwatch-timer";

import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { requestStoragePermission } from "@/services/PermissionService";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import ToastService from "@/services/ToastService";
import VideoUrlServiceClass from "@/services/VideoUrlClass";
import { goBack } from "@/ultils/navigation";
import { useInteractionManager } from "@react-native-community/hooks";
import VideoUrlClass from "@/services/VideoUrlClass";

export interface PracticingScreenProps {}

const option = {
  quality: 1,
  fixOrientation: true,
  forceUpOrientation: true,
};

export const PracticingScreen = memo(function PracticingScreen() {
  const cameraRef = useRef<RNCamera>(null);
  const interactionManager = useInteractionManager();
  const [loader, setLoader] = useState(false);
  const [captureType, setCaptureType] = useState("back");
  const [toggleCameraAction, setToggleCameraAction] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [isPracticing, setPracticing] = useState(false);

  const [{ loading: loadConnect }, startConnect] = useAsyncFn(async () => {
    const machineId = MachineIdService.getMachineId();
    await requestConnectMachineHitMode(machineId, "5");

    onCameraAction().then();
    setPracticing(true);
  }, []);

  const onCameraAction = useCallback(async () => {
    if (cameraRef?.current && !toggleCameraAction) {
      setToggleCameraAction(true);
      setLoader(true);
      try {
        setIsStopwatchStart(true);
        // @ts-ignore
        const { uri, codec = "mp4" } = await cameraRef?.current?.recordAsync(
          {}
        );
        VideoUrlClass.setTimeStart(moment().format("mm:ss"));
        let fileName = `video_${moment().format("YYYYMMDDHHMMSS")}.mp4`;
        await SaveToStorage(uri, fileName);
        setLoader(false);
      } catch (err) {
        setLoader(false);
        Alert.alert("Error", "Failed to record video: " + (err.message || err));
      }
    }
    if (toggleCameraAction) {
      // @ts-ignore
      cameraRef?.current?.stopRecording();
      setIsStopwatchStart(false);
      setToggleCameraAction(false);
    }
  }, [cameraRef?.current, toggleCameraAction]);

  const SaveToStorage = useCallback(async (uri: string, fileName: string) => {
    const result = await requestStoragePermission();
    if (result == "granted") {
      let uriPicture = uri.replace("file://", "");

      if (Platform.OS === "ios") {
        RNFS.copyFile(uriPicture, RNFS.CachesDirectoryPath + fileName).then(
          () => {
            ToastService.show("Hoàn thành bài tập");
            createThumbnail({
              url: uri,
              timeStamp: 10000,
            })
              .then((response) => {
                VideoUrlServiceClass.changeURL(
                  uriPicture,
                  response.path,
                  moment().format("mm")
                );
              })
              .catch((err) => console.warn({ err }));
          },
          (error) => {}
        );
      } else {
        await VideoUrlServiceClass.changeURL(
          uri,
          "null",
          moment().format("mm")
        );
        ToastService.show("Hoàn thành bài tập");
      }
    } else {
      Alert.alert(
        "Permission Request",
        "Please allow storage permission from app settings.",
        [{ text: "Open Settings", onPress: () => Linking.openSettings() }]
      );
    }
  }, []);

  // const cameraReverse = useCallback(() => {
  //   if (captureType === "back") setCaptureType("front");
  //   else setCaptureType("back");
  //   setMirrorMode(!mirrorMode);
  // }, [captureType]);

  const [{ loading }, endPracticing] = useAsyncFn(async () => {
    const machineId = MachineIdService.getMachineId();
    await requestConnectMachineHitMode(machineId, "-1");
    await onCameraAction();
    goBack();
  }, [cameraRef?.current, toggleCameraAction]);

  return (
    <ScreenWrapper>
      <DynamicHeader title={"Tập luyện"} />

      {interactionManager && (
        <ScrollView>
          <View
            style={
              Platform.OS == "ios" ? {} : { paddingTop: 40, marginBottom: 40 }
            }
          >
            <RNCamera
              ref={cameraRef}
              style={styles.container}
              captureAudio={true}
              playSoundOnCapture={true}
              type={
                captureType === "back"
                  ? RNCamera.Constants.Type.back
                  : RNCamera.Constants.Type.front
              }
              androidCameraPermissionOptions={{
                title: "Permission to use camera",
                message: "We need your permission to use your camera",
                buttonPositive: "Ok",
                buttonNegative: "Cancel",
              }}
              androidRecordAudioPermissionOptions={{
                title: "Permission to use audio recording",
                message: "We need your permission to use your audio",
                buttonPositive: "Ok",
                buttonNegative: "Cancel",
              }}
            >
              <View style={styles.onPictureView}>
                {loader && !toggleCameraAction ? (
                  <View style={styles.onPictureClick}>
                    <ActivityIndicator size={75} color="#ffffff" />
                  </View>
                ) : (
                  <View style={styles.onPictureClick}>
                    <View
                      style={[
                        styles.onPictureCircleView,
                        {
                          backgroundColor: toggleCameraAction ? "red" : "white",
                        },
                      ]}
                    />
                  </View>
                )}
              </View>
            </RNCamera>
          </View>
        </ScrollView>
      )}
      {isStopwatchStart && (
        <Stopwatch
          laps
          // hours={watchMin === "59" && watchSec === "59" ? true : false}
          start={isStopwatchStart}
          options={options}
        />
      )}
      <SButtonPractice>
        {!isPracticing ? (
          <GradientButton
            loading={loading}
            label={"Bắt đầu tập luyện"}
            onPress={startConnect}
          />
        ) : (
          <GradientButton
            loading={loading}
            label={"Kết thức tập luyện"}
            onPress={endPracticing}
          />
        )}
      </SButtonPractice>
    </ScreenWrapper>
  );
});

const SButtonPractice = styled.View`
  flex: 1;
  margin: 16px;
`;

export default PracticingScreen;

const options = {
  container: {
    padding: 5,
    marginTop: 16,
    maxHeight: 50,
    alignItems: "center",
    flex: 1,
  },
  text: {
    fontSize: 25,
    color: "#FFF",
    marginLeft: 7,
  },
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 400,
    backgroundColor: "red",
    position: "relative",
  },

  bottomView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 100,
  },
  onPictureView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  onPictureClick: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderColor: "white",
    borderWidth: 3,
  },
  onPictureCircleView: {
    position: "absolute",
    bottom: 4.5,
    alignSelf: "center",
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderColor: "white",
  },
});
