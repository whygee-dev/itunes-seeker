import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import Text from "./Text";
import { Filter } from "../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter, setFilter } from "../redux/slices/filtersSlice";

type Props = {
  filters: Filter[];
};

const Filters = (props: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const onFilterSelect = (filter: Filter) => {
    dispatch(setFilter(filter));
  };

  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalOpen(true)} style={styles.container}>
        <Icon name="filter" size={20} color="#fff"></Icon>
      </TouchableOpacity>
      <Modal
        style={{ padding: 0, margin: 0 }}
        isVisible={modalOpen}
        onBackdropPress={() => onClose()}
        onSwipeComplete={() => onClose()}
        swipeDirection="up"
      >
        <View style={styles.filters}>
          <View style={styles.swipableIndicator}></View>
          {props.filters.map((f) => {
            return (
              <TouchableOpacity key={f.name} onPress={() => onFilterSelect(f)}>
                <View style={[styles.filter, { backgroundColor: filter.name === f.name ? "#050527" : "#1a1a40" }]}>
                  <Text color="#fff">{f.display}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    </>
  );
};

const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderColor: "white",
  },

  filters: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    height: window.height / 3.25,
    backgroundColor: "#232356",
    position: "absolute",
    top: 0,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  filter: {
    margin: window.height / 100,
    borderRadius: 10,
    padding: 8,
  },

  swipableIndicator: {
    position: "absolute",
    bottom: 20,
    left: window.width / 2 - 25,
    width: 50,
    height: 5,
    backgroundColor: "#050527",
    borderRadius: 8,
  },
});

export default Filters;
