import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { selectTracks } from "../redux/slices/tracksSlice";
import { Track as TTrack } from "../redux/types";
import Track from "./Track";

type Props = {
  tracks: TTrack[];
  tracksAddable: boolean;
  tracksRemovable: boolean;
};

const TracksList = (props: Props) => {
  const userList = useSelector(selectTracks);

  return (
    <ScrollView style={styles.scrollView} persistentScrollbar>
      {props.tracks.map((track) => {
        const existing = userList.find((t) => (t.trackId ? t.trackId === track.trackId : t.collectionId === track.collectionId));

        return (
          <Track
            removable={props.tracksRemovable}
            addable={props.tracksAddable}
            addDisabled={!!existing}
            key={track.trackId || (track?.collectionId || "") + (track?.description || "")}
            track={track}
          />
        );
      })}
    </ScrollView>
  );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollView: {
    height: (window.height * 4) / 5 - 50,
    position: "absolute",
    top: window.height / 5,
  },
});

export default TracksList;
