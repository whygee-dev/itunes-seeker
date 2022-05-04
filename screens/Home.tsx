import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Dimensions, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "../redux/hooks";
import { selectSearchInput, setSearchInput, selectSearchTracks, setSearchTracks } from "../redux/slices/tracksSlice";
import Icon from "react-native-vector-icons/Ionicons";
import Text from "../components/Text";
import axios from "axios";
import { selectFetchTimeout, setFetchTimeout } from "../redux/slices/extrasSlice";
import TracksList from "../components/TracksList";
import { SoundContext } from "../context/SoundProvider";
import Filters from "../components/Filters";
import { FILTERS } from "../tools/constants";
import { selectFilter } from "../redux/slices/filtersSlice";

const Home = () => {
  const searchTracks = useSelector(selectSearchTracks);
  const searchInput = useSelector(selectSearchInput);
  const fetchTimeout = useSelector(selectFetchTimeout);
  const filter = useSelector(selectFilter);

  const [loading, setLoading] = useState(false);
  const { sound } = useContext(SoundContext);
  const dispatch = useDispatch();

  const search = async (search: string) => {
    if (search.replace(/\s/g, "") === "") return;
    console.log(`https://itunes.apple.com/search?&media=${filter.name}&country=FR&term=${search}`);

    setLoading(true);
    const results = (await (await axios.get(`https://itunes.apple.com/search?&media=${filter.name}&country=FR&term=${search}`)).data?.results) || [];
    console.log(results);
    dispatch(setSearchTracks(results));
    dispatch(setFetchTimeout(null));
    setLoading(false);
  };

  useEffect(() => {
    if (!searchInput || searchInput.length === 0) {
      dispatch(setSearchTracks([]));

      if (fetchTimeout) clearTimeout(fetchTimeout);

      return;
    }

    if (fetchTimeout) {
      clearTimeout(fetchTimeout);
    }

    dispatch(setFetchTimeout(setTimeout(() => search(searchInput), 1000)));
  }, [searchInput, filter]);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <View style={styles.searchContainer}>
        <Filters filters={FILTERS}></Filters>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="white"
            value={searchInput}
            onChangeText={(t) => dispatch(setSearchInput(t))}
          ></TextInput>
          <Icon name="search" style={styles.searchIcon} color="#fff" size={18}></Icon>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size={40} color="#fff" animating style={styles.loader} />
      ) : (
        <View style={styles.searchResults}>
          {searchTracks && searchTracks.length !== 0 ? (
            <TracksList tracksRemovable={false} tracksAddable tracks={searchTracks} />
          ) : (searchInput && searchInput.length === 0) || fetchTimeout ? (
            <Text style={styles.fallbackText} size={25} numberOfLines={2}>
              Search for your favorite tracks
            </Text>
          ) : (
            <Text style={styles.fallbackText} size={25} numberOfLines={2}>
              No results found
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  loader: {
    position: "absolute",
    top: window.height / 2 - 20,
    left: window.width / 2 - 20,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    position: "absolute",
    top: 10,
    width: "100%",
    backgroundColor: "transparent",
    zIndex: 2,
  },
  inputContainer: {
    width: "80%",
    position: "relative",
  },
  searchInput: {
    borderWidth: 1,
    padding: 10,
    paddingTop: 15,
    width: "100%",
    borderColor: "white",
    borderRadius: 16,
    fontFamily: "Poppins-Regular",
    color: "white",
  },
  searchIcon: {
    position: "absolute",
    top: "33%",
    right: 20,
  },
  searchResults: {},

  fallbackText: {
    alignSelf: "center",
    top: window.height / 2 - 50,
    textAlign: "center",
    marginHorizontal: 10,
  },
});

export default Home;
