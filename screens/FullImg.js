import { useState, useEffect, useReducer } from "react";
import { Text, View, StyleSheet, Modal, Pressable } from "react-native";
import { useToast } from "react-native-toast-notifications";
import ImageViewer from "react-native-image-zoom-viewer";
import moment from "moment/moment";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

function FullImg({ route }) {
  const { item, urls, data } = route.params;
  const [modalState, setModalState] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [updateItem, setUpdateItem] = useState(item);
  const [info, setInfo] = useState(false);
  const toast = useToast();
  let favData = [];

  useEffect(() => {
    retrieve();
  }, [updateItem]);

  const retrieve = async () => {
    await getFavorites();
    setFavorite(imgSaved() >= 0);
  };

  function itemIndex(i) {
    const index = urls.findIndex((element) => element.url === i.img);
    return index;
  }

  const getFavorites = async () => {
    let favFile = await AsyncStorage.getItem("favorites");
    if (favFile != null) {
      favData = Array.from(JSON.parse(favFile));
    }
  };

  const handleDownload = async () => {
    let date = moment().format("YYYYMMDD_hhmmss");
    let fileUri = `${FileSystem.documentDirectory}${date}.png`;

    try {
      await MediaLibrary.requestPermissionsAsync();
      await FileSystem.downloadAsync(updateItem.download, fileUri);
      try {
        await MediaLibrary.createAssetAsync(fileUri);
        toast.show("Image Downloaded", { type: "rounded_toast" });
      } catch (err) {
        console.log("Save err: ", err);
      }
    } catch (err) {
      console.log("Write: ", err);
    }
  };

  function imgSaved() {
    const index = favData.findIndex(
      (element) => JSON.stringify(element) === JSON.stringify(updateItem)
    );
    return index;
  }

  const handleFavorite = async () => {
    await getFavorites();
    if (imgSaved() >= 0) {
      setFavorite(false);
      favData.splice(imgSaved(), 1);
    } else {
      setFavorite(true);
      favData.push(updateItem);
    }
    AsyncStorage.setItem("favorites", JSON.stringify(favData));
  };

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const showInfo = () => {
    setInfo(!info);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#d1e6f0" }}>
      <Modal
        visible={modalState}
        statusBarTranslucent={true}
        presentationStyle="fullScreen"
        animationType="fade"
        style={{ justifyContent: "center" }}
        searchPlaceholder="Categories"
      >
        <ImageViewer
          imageUrls={urls}
          renderIndicator={() => {}}
          backgroundColor="#606566"
          index={itemIndex(updateItem)}
          saveToLocalByLongPress={false}
          onClick={toggleModal}
        />
      </Modal>
      <Modal
        visible={info}
        statusBarTranslucent={true}
        presentationStyle="fullScreen"
        animationType="fade"
        style={{ justifyContent: "center" }}
        >
          <Pressable
            onPress={showInfo}
            style={{
              backgroundColor: "#12b2e3dd",
              padding: 10,
              borderRadius: 10,
              alignSelf: "flex-end",
              margin: 50,
            }}
            >
            <Text>Close</Text>
          </Pressable>
          <Text>
            {"Description: " + updateItem.description}
            {"\nCreated at: " + updateItem.created}
            {"\nUpdated at: " + updateItem.updated}
            {"\nTags: " + updateItem.tags}
          </Text>
          <MapView
            style={{ height: "50%", width: "100%", alignSelf: "center", borderRadius: 30, display: updateItem.latitude ? "flex" : "none" }}
            initialRegion={{
              latitude: updateItem.latitude,
              longitude: updateItem.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: updateItem.latitude,
                longitude: updateItem.longitude,
              }}
              title={updateItem.title}
            />
          </MapView>
        </Modal>
      <ImageViewer
        imageUrls={urls}
        renderIndicator={() => {}}
        backgroundColor="#f5fcff"
        saveToLocalByLongPress={false}
        onClick={toggleModal}
        index={itemIndex(item)}
        style={{ justifyContent: "center" }}
        onChange={async (index) => {
          setUpdateItem(data[index]);
          await retrieve();
        }}
        onSwipeDown={toggleModal}
      />
      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, { backgroundColor: "#12b2e3dd" }]}
          onPress={handleDownload}
        >
          <Text style={[styles.buttonText]}>Download</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleFavorite}>
          <Ionicons
            name={favorite ? "star" : "star-outline"}
            size={30}
            color="#506475"
          />
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: "#4e8291" }]}
          onPress={showInfo}>
          <Text style={styles.buttonText}>
                More Info
          </Text>
        </Pressable>
      </View>
      <Text style={styles.info}>Photographer: {updateItem.author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    fontSize: 18,
    color: "#798d94",
    margin: 15,
    alignSelf: "center",
  },
  buttonRow: {
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    width: "100%",
  },
  button: {
    marginVertical: 10,
    borderRadius: 50,
    alignSelf: "center",
    padding: 15,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    borderRadius: 50,
  },
});

export default FullImg;
