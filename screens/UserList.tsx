import React from "react";
import { Dimensions, StyleSheet, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TracksList from "../components/TracksList";
import { selectFilteredTracks } from "../redux/slices/tracksSlice";
import Text from "../components/Text";
import Filters from "../components/Filters";
import { FILTERS } from "../tools/constants";

const UserList = () => {
  const tracks = useSelector(selectFilteredTracks);
  const dispatch = useDispatch();

  return (
    <View>
      <View style={styles.filterContainer}>
        <Filters filters={FILTERS}></Filters>
      </View>

      {tracks.length === 0 ? (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyText} size={24} numberOfLines={2}>
            Your list is emptier than Eren Yeager's eyes :(
          </Text>

          <Image style={{ width: 300, height: 200 }} source={{ uri: "https://i.ibb.co/3sqN6Tp/eren-empty-eyes.webp" }} />
        </View>
      ) : (
        <TracksList tracksRemovable tracksAddable={false} tracks={tracks}></TracksList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
    position: "absolute",
    top: 10,
    width: "100%",
    backgroundColor: "transparent",
    zIndex: 2,
    height: 95,
  },
  emptyListContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
  },
  emptyText: {
    textAlign: "center",
    marginBottom: 30,
  },
});

export default UserList;
