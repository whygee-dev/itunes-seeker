import React, { useContext } from "react";
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { Track as _Track } from "../redux/types";
import Text from "./Text";
import { useDispatch } from "react-redux";
import { addTrack, removeTrack } from "../redux/slices/tracksSlice";
import MusicPlayer from "./AudioPlayer";
import Icon from "react-native-vector-icons/Entypo";
import { SoundContext } from "../context/SoundProvider";
import VideoPlayer from "./VideoPlayer";

type Props = {
  track: _Track;
  addDisabled?: boolean;
  addable?: boolean;
  removable?: boolean;
};

const Track = (props: Props) => {
  const dispatch = useDispatch();
  const { sound } = useContext(SoundContext);

  const addToList = () => {
    dispatch(addTrack(props.track));
  };

  const removeFromList = async () => {
    await sound?.pauseAsync();
    dispatch(removeTrack(props.track));
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: props.track.artworkUrl100 }} style={styles.artwork}></Image>

      <View style={styles.infosContainer}>
        <Text numberOfLines={2}>
          {props.track.artistName} - {props.track.trackName || props.track.collectionName}
        </Text>

        <View style={styles.row}>
          {props.track.previewUrl ? (
            props.track.kind === "song" || props.track.wrapperType === "audiobook" ? (
              <MusicPlayer uri={props.track.previewUrl}></MusicPlayer>
            ) : (
              <VideoPlayer uri={props.track.previewUrl}></VideoPlayer>
            )
          ) : (
            <></>
          )}

          {(props.addable || props.removable) && (
            <View style={[styles.addOrRemove, !props.track.previewUrl ? styles.isolated : {}]}>
              {props.removable ? (
                <TouchableOpacity onPress={removeFromList}>
                  <Icon name="trash" size={24} color="#fff"></Icon>
                </TouchableOpacity>
              ) : props.addDisabled ? (
                <Icon name="check" size={24} color="#fff"></Icon>
              ) : (
                <TouchableOpacity onPress={addToList}>
                  <Icon name="add-to-list" size={24} color="#fff"></Icon>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flexDirection: "row",
    backgroundColor: "#560bad",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 12,
  },

  infosContainer: {
    width: window.width - 120,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  artwork: {
    height: 90,
    width: 90,
    marginRight: 10,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  addOrRemove: {
    backgroundColor: "#F72585",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "12.5%",
    marginTop: 10,
    marginRight: 10,
    borderRadius: 5,
  },

  isolated: {
    marginLeft: "auto",
    height: 50,
  },
});

export default Track;
