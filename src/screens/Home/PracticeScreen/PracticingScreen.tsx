import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { ScreenWrapper } from "@/common/CommonStyles";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { styled, useAsyncFn } from "@/global";
import { Colors } from "@/themes/Colors";
import GradientButton from "@/componens/Gradient/ButtonGradient";
import { goBack } from "@/ultils/navigation";
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
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { requestStoragePermission } from "@/services/PermissionService";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import ToastService from "@/services/ToastService";
import VideoUrlServiceClass from "@/services/VideoUrlClass";
import { requestListMyRating } from "@/store/ratings/functions";

export interface PracticingScreenProps {}

const option = {
  quality: 1,
  fixOrientation: true,
  forceUpOrientation: true,
};

export const PracticingScreen = memo(function PracticingScreen() {
  const cameraRef = useRef<RNCamera>(null);
  const [loader, setLoader] = useState(false);
  const [captureType, setCaptureType] = useState("back");
  const [mirrorMode, setMirrorMode] = useState(false);
  const [toggleCameraAction, setToggleCameraAction] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [watchMin, setWatchMin] = useState("00");
  const [watchSec, setWatchSec] = useState("00");
  console.log("toggleCameraAction", toggleCameraAction);

  const [{ loading: loadConnect }, getData] = useAsyncFn(async () => {
    const machineId = MachineIdService.getMachineId();
    await requestConnectMachineHitMode(machineId, "5");
  }, []);

  useEffect(() => {
    getData().then();
  }, []);

  useEffect(() => {
    if (cameraRef?.current && !loadConnect && !toggleCameraAction) {
      onCameraAction().then();
    }
  }, [cameraRef?.current, loadConnect, toggleCameraAction]);

  const onCameraAction = useCallback(async () => {
    if (cameraRef?.current && !toggleCameraAction) {
      console.log("as", cameraRef?.current.isRecording());

      setToggleCameraAction(true);
      setLoader(true);
      console.log("1");
      try {
        setIsStopwatchStart(true);
        console.log("2");
        // @ts-ignore
        const { uri, codec = "mp4" } = await cameraRef?.current?.recordAsync(
          {}
        );
        console.log("3");

        let fileName = `video_${moment().format("YYYYMMDDHHMMSS")}.mp4`;
        console.log("4");

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
      setWatchMin("00");
      setWatchSec("00");
      setIsStopwatchStart(false);
      setToggleCameraAction(false);
    }
  }, [cameraRef?.current, toggleCameraAction]);

  const SaveToStorage = useCallback(async (uri: string, fileName: string) => {
    console.log("ủi", uri);
    const result = await requestStoragePermission();
    if (result == "granted") {
      let uriPicture = uri.replace("file://", "");
      RNFS.copyFile(uriPicture, RNFS.CachesDirectoryPath + fileName).then(
        () => {
          ToastService.show("Video Saved to Download");
          createThumbnail({
            url: uri,
            timeStamp: 10000,
          })
            .then((response) => {
              VideoUrlServiceClass.changeURL(uriPicture, response.path);
            })
            .catch((err) => console.warn({ err }));
        },
        (error) => {
          Alert.alert("CopyFile fail for video" + ": " + error);
        }
      );
    } else {
      Alert.alert(
        "Permission Request",
        "Please allow storage permission from app settings.",
        [{ text: "Open Settings", onPress: () => Linking.openSettings() }]
      );
    }
  }, []);

  const cameraReverse = useCallback(() => {
    if (captureType === "back") setCaptureType("front");
    else setCaptureType("back");
    setMirrorMode(!mirrorMode);
  }, [captureType]);

  const [{ loading }, endPracticing] = useAsyncFn(async () => {
    const machineId = MachineIdService.getMachineId();
    const aa = VideoUrlServiceClass.getVideoUrl();
    await requestConnectMachineHitMode(machineId, "-1");
    await onCameraAction();
    console.log("aa", aa);
    // goBack();
  }, [cameraRef?.current, toggleCameraAction]);

  return (
    <ScreenWrapper>
      <DynamicHeader title={"Tập luyện"} />

      {/*<SText>*/}
      {/*  <TimeStartPractice stopTime={450000000} />*/}
      {/*</SText>*/}

      {isStopwatchStart && (
        <Stopwatch
          laps
          // hours={watchMin === "59" && watchSec === "59" ? true : false}
          start={isStopwatchStart}
          options={options}
        />
      )}

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
        <View style={styles.bottomView}>
          {isStopwatchStart && (
            <>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.touchableCamera}
                onPress={cameraReverse}
              >
                <View style={styles.cameraView}>
                  <Icon name="camera-reverse" size={30} color="white" />
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.onPictureView}>
          {loader && !toggleCameraAction ? (
            <View style={styles.onPictureClick}>
              <ActivityIndicator size={75} color="#ffffff" />
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.onPictureClick}
              onPress={onCameraAction}
            >
              <View
                style={[
                  styles.onPictureCircleView,
                  { backgroundColor: toggleCameraAction ? "red" : "white" },
                ]}
              />
            </TouchableOpacity>
          )}
        </View>
      </RNCamera>

      <SButtonPractice>
        <GradientButton
          loading={loading}
          label={"Kết thức tập luyện"}
          onPress={endPracticing}
        />
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
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
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
  touchableCamera: {
    position: "absolute",
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  cameraView: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
});
