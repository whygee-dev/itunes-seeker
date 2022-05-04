import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Video } from "expo-av";
import { AVPlaybackStatus } from "../redux/types";
import { useState } from "react";
import Modal from "react-native-modal";
import Button from "./Button";

type Props = {
  uri: string;
};

export const VideoPlayer = (props: Props) => {
  const video = React.useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const onClose = async () => {
    setModalOpen(false);
    await video.current?.pauseAsync();
  };

  const playVideo = async () => {
    if (status?.isPlaying) {
      await video.current?.pauseAsync();
      setModalOpen(false);
    } else {
      await video.current?.playAsync();
      setModalOpen(true);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        style={{ padding: 0, margin: 0 }}
        isVisible={modalOpen}
        onBackdropPress={() => onClose()}
        onSwipeComplete={() => onClose()}
        swipeDirection="down"
      >
        <View style={styles.videoContainer}>
          <View style={styles.swipableIndicator}></View>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: props.uri,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(status as AVPlaybackStatus)}
          />
        </View>
      </Modal>

      <Button titleStyle={{ color: "#000" }} containerStyle={styles.button} title={"Play Video"} onPress={playVideo} />
    </View>
  );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  video: {
    alignSelf: "center",
    width: window.width - 20,
    height: window.height / 2.5,
    marginTop: 40,
  },
  videoContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-end",
    height: window.height / 2.5 + 40,
    backgroundColor: "#232356",
    position: "absolute",
    bottom: 0,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    padding: 20,
    paddingBottom: 0,
  },
  button: {
    backgroundColor: "white",
    width: "75%",
    height: 50,
    marginTop: 10,
  },
  swipableIndicator: {
    position: "absolute",
    top: 10,
    left: window.width / 2 - 25,
    width: 50,
    height: 5,
    backgroundColor: "#050527",
    borderRadius: 8,
  },
});

export default VideoPlayer;
