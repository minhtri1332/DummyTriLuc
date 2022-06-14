import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Video from "react-native-video";
import { goBack } from "@/ultils/navigation";
import { useNavigationParams } from "@/hooks/useNavigationParams";
import VideoPlayer from "react-native-video-player";
import { VIDEO } from "@/assets";

const PracticeDisplayView = () => {
  const { uri } = useNavigationParams();
  const [isLoading, setIsLoading] = useState(false);

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onLoad = () => {
    setIsLoading(false);
  };

  const onEnd = () => {
    goBack();
  };

  return (
    <View style={Styles.container}>
      {isLoading && (
        <View style={Styles.activityIndicator}>
          <ActivityIndicator style={{ flex: 1 }} size={75} color="#ffffff" />
        </View>
      )}

      <VideoPlayer
        autoplay={true}
        video={{ uri: uri }}
        videoWidth={1600}
        videoHeight={1000}
        showDuration={true}
        disableSeek={true}
        onPlayPress={() => {}}
        onEnd={() => {}}
        onLoadStart={() => {
          console.log("ok1");
        }}
        thumbnail={{ uri: "https://i.picsum.photos/id/866/1600/900.jpg" }}
      />
      {/*<Video*/}
      {/*  onLoad={onLoad}*/}
      {/*  onLoadStart={onLoadStart}*/}
      {/*  onEnd={onEnd}*/}
      {/*  controls={true}*/}
      {/*  style={{ flex: 1 }}*/}
      {/*  resizeMode={"cover"}*/}
      {/*  source={{ uri: uri }}*/}
      {/*  // source={{*/}
      {/*  // uri:*/}
      {/*  //     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',*/}
      {/*  // }}*/}
      {/*  volume={10}*/}
      {/*/>*/}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  activityIndicator: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});

export default PracticeDisplayView;
