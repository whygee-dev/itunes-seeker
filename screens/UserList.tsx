import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TracksList from "../components/TracksList";
import { selectTracks, setTracks } from "../redux/slices/tracksSlice";
import Text from "../components/Text";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserList = () => {
  const tracks = useSelector(selectTracks);
  const dispatch = useDispatch();

  // const getTracks = async () => {
  //   const unparsedTracks = await AsyncStorage.getItem("tracks");
  //   const tracks = unparsedTracks ? JSON.parse(unparsedTracks) : [];
  //   dispatch(setTracks(tracks));
  // };

  // useEffect(() => {
  //   getTracks();
  // }, []);

  return (
    <View>
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
