import React, { memo, useRef, useState } from "react";
import { ScreenWrapper } from "@/common/CommonStyles";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import TimeStartPractice from "@/screens/Home/PracticeScreen/TimeStartPractice";
import { styled, useAsyncFn } from "@/global";
import { Colors } from "@/themes/Colors";
import GradientButton from "@/componens/Gradient/ButtonGradient";
import { goBack, navigateToPracticeDisplayView } from "@/ultils/navigation";
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
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import ImageResizer from "react-native-image-resizer";
import { requestStoragePermission } from "@/services/PermissionService";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import ToastService from "@/services/ToastService";

export interface PracticingScreenProps {}

export const PracticingScreen = memo(function PracticingScreen() {
  const cameraRef = useRef();
  const [loader, setLoader] = useState(false);
  const [videoCompressedLoader, setVideoCompressedLoader] = useState(false);
  const [videoCompressProgress, setVideoCompressProgress] = useState(0);
  const [cameraType, setCameraType] = useState("Photo");
  const [captureType, setCaptureType] = useState("back");
  const [mirrorMode, setMirrorMode] = useState(false);
  const [toggleCameraAction, setToggleCameraAction] = useState(false);
  const [filter, setFilter] = useState(["Unchanged", "Compressed"]);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [uriPicture, setPictureURI] = useState("");
  const [watchMin, setWatchMin] = useState("00");
  const [watchSec, setWatchSec] = useState("00");
  const [filterView, setFilterView] = useState(false);
  const [picture_compressed, setState] = useState({
    fileName: "",
    uri: "",
    type: "",
  });

  const onCameraAction = async () => {
    if (!cameraRef?.current) return;

    let options = {
      quality: 1,
      fixOrientation: true,
      forceUpOrientation: true,
      // base64: true
    };
    if (cameraRef && cameraType === "Video" && !toggleCameraAction) {
      setToggleCameraAction(true);
      setLoader(true);
      try {
        setIsStopwatchStart(true);
        // @ts-ignore
        const { uri, codec = "mp4" } = await cameraRef.current.recordAsync(
          options
        );
        console.log("uri", uri);
        setPictureURI(uri);
        setFilterView(true);
        SaveToStorage(uri, cameraType, "1");
        setLoader(false);
      } catch (err) {
        setLoader(false);
        Alert.alert("Error", "Failed to record video: " + (err.message || err));
      }
    }
    if (toggleCameraAction && cameraType === "Video") {
      // @ts-ignore
      cameraRef.current.stopRecording();
      setWatchMin("00");
      setWatchSec("00");
      setIsStopwatchStart(false);
      setToggleCameraAction(false);
    }
    if (cameraType === "Photo") {
      try {
        setLoader(true);
        // @ts-ignore
        const data = await cameraRef.current.takePictureAsync(options);
        setFilterView(true);
        setPictureURI(data);
        SaveToStorage(data.uri, cameraType);
        setLoader(false);
      } catch (err) {
        setLoader(false);
        Alert.alert("Error", "Failed to take picture: " + (err.message || err));
      }
    }
  };

  const SaveToStorage = async (
    uri: string,
    camType: string,
    fileName: string
  ) => {
    const result = await requestStoragePermission();
    if (result == "granted") {
      let uriPicture = uri.replace("file://", "");
      //RNFS.copyFile(data.uri, RNFS.PicturesDirectoryPath + '/Videos/' + fileName).then(() => {
      RNFS.copyFile(uriPicture, RNFS.CachesDirectoryPath + fileName).then(
        () => {
          // RNFS.copyFile(uriPicture, '/sdcard/DCIM/' + fileName).then(() => {
          ToastService.show(camType + " Saved to Download");
          if (camType === "Video") {
            createThumbnail({
              url: uri,
              timeStamp: 10000,
            })
              .then((response) => {
                console.warn({ response });
                navigateToPracticeDisplayView({
                  thumbnail: response.path,
                  uri: uriPicture,
                });
              })
              .catch((err) => console.warn({ err }));
          }
        },
        (error) => {
          Alert.alert("CopyFile fail for " + camType + ": " + error);
        }
      );
    } else {
      Alert.alert(
        "Permission Request",
        "Please allow storage permission from app settings.",
        [{ text: "Open Settings", onPress: () => Linking.openSettings() }]
      );
    }
  };

  const selectSizeToSave = async (i) => {
    if (i === "Unchanged") {
      let fileName;
      if (cameraType === "Photo") {
        fileName = `${cameraType}_${moment().format("YYYYMMDDHHMMSS")}.jpg`;
        SaveToStorage(uriPicture?.uri, cameraType, fileName);
      } else {
        fileName = `${cameraType}_${moment().format("YYYYMMDDHHMMSS")}.mp4`;
        // const thumbnail =  await ProcessingManager.getPreviewForSecond(uriPicture);
        SaveToStorage(uriPicture, cameraType, fileName);
      }
    } else {
      if (cameraType === "Photo") {
        imageResize(uriPicture?.uri, cameraType);
      } else {
        compressVideo(uriPicture, cameraType);
      }
    }
    setFilterView(false);
  };

  const imageResize = (uri, camType) => {};

  const compressVideo = async (uri, camType) => {
    let fileName = `${camType}_${moment().format("YYYYMMDDHHMMSS")}.mp4`;
    RNVideoHelper.compress(uri, {
      startTime: 0, // optional, in seconds, defaults to 0
      endTime: 100, //  optional, in seconds, defaults to video duration
      quality: "low", // default low, can be medium or high
      defaultOrientation: 0, // By default is 0, some devices not save this property in metadata. Can be between 0 - 360
    })
      .progress((value: any) => {
        setVideoCompressedLoader(true);
        let compressTime = parseInt(value * 100);
        setVideoCompressProgress(compressTime);
      })
      .then((compressedUri: any) => {
        const compressed = `file://${compressedUri}`;
        setVideoCompressedLoader(false);
        SaveToStorage(compressed, cameraType, fileName);
      })
      .catch((err) => {
        Alert.alert("Compress Video Error", err);
      });
  };

  const cameraReverse = () => {
    if (captureType === "back") setCaptureType("front");
    else setCaptureType("back");
    setMirrorMode(!mirrorMode);
  };
  const [{ loading }, endPracticing] = useAsyncFn(async () => {
    const machineId = MachineIdService.getMachineId();
    await requestConnectMachineHitMode(machineId, "-1");
    goBack();
  }, []);

  return (
    <ScreenWrapper>
      <DynamicHeader title={"Tập luyện"} />

      <SText>
        <TimeStartPractice stopTime={450000000} />
      </SText>

      <RNCamera
        ref={cameraRef}
        style={styles.container}
        captureAudio={true}
        type={
          captureType === "back"
            ? RNCamera.Constants.Type.back
            : RNCamera.Constants.Type.front
        }
        mirrorImage={mirrorMode}
        playSoundOnCapture={true}
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
          {isStopwatchStart && cameraType === "Video" ? (
            <Stopwatch
              laps
              // hours={watchMin === "59" && watchSec === "59" ? true : false}
              start={isStopwatchStart}
              options={options}
            />
          ) : (
            <>
              <TouchableOpacity
                style={{
                  borderBottomColor:
                    cameraType === "Photo" ? "yellow" : "white",
                  borderBottomWidth: cameraType === "Photo" ? 1 : 0,
                }}
                onPress={() => setCameraType("Photo")}
              >
                <Text
                  style={[
                    styles.textStyle,
                    { color: cameraType === "Photo" ? "yellow" : "white" },
                  ]}
                >
                  Photo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderBottomColor:
                    cameraType === "Video" ? "yellow" : "white",
                  borderBottomWidth: cameraType === "Video" ? 1 : 0,
                  marginLeft: 30,
                }}
                onPress={() => setCameraType("Video")}
              >
                <Text
                  style={[
                    styles.textStyle,
                    { color: cameraType === "Video" ? "yellow" : "white" },
                  ]}
                >
                  Video
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.touchableCamera}
                onPress={() => cameraReverse()}
              >
                <View style={styles.cameraView}>
                  <Icon name="camera-reverse" size={30} color="white" />
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.onPictureView}>
          {loader &&
          (cameraType === "Photo" ||
            (cameraType === "Video" && !toggleCameraAction)) ? (
            <View style={styles.onPictureClick}>
              <ActivityIndicator size={75} color="#ffffff" />
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.onPictureClick}
              onPress={() => onCameraAction()}
            >
              {cameraType === "Video" ? (
                <View
                  style={[
                    styles.onPictureCircleView,
                    { backgroundColor: toggleCameraAction ? "red" : "white" },
                  ]}
                ></View>
              ) : (
                <View style={styles.onPictureCircleView}></View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </RNCamera>

      <SButtonPractice>
        <GradientButton
          loading={loading}
          label={"Kết thức tập luyện"}
          onPress={() => {}}
        />
      </SButtonPractice>

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

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: "lightgreen",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text>Waiting</Text>
  </View>
);

const SButtonPractice = styled.View`
  flex: 1;
  margin: 16px;
`;

const SText = styled.Text`
  justify-content: center;
  align-self: center;
  color: ${Colors.colorText};
  font-size: 30px;
  margin-top: 20px;
`;

export default PracticingScreen;

const options = {
  container: {
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: "#FFF",
    marginLeft: 7,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    height: "100%",
    zIndex: 1,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  modalStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
  },
  bottomView: {
    flexDirection: "row",
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 100,
  },
  textStyle: {
    color: "#fff",
    fontSize: 20,
  },
  onPictureView: {
    width: "100%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  onPictureClick: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    borderColor: "white",
    borderWidth: 3,
  },
  onPictureCircleView: {
    position: "absolute",
    bottom: 4.5,
    alignSelf: "center",
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
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
