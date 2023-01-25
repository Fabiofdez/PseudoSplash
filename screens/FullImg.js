import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import ImageViewer from "react-native-image-zoom-viewer";
import moment from "moment/moment";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Map from "../components/Map.js";

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

  const infoContainer = (<View
    style={{
      backgroundColor: "#508e9477",
      borderRadius: 35,
      padding: 25,
      marginBottom: "5%",
    }}
  >
    {updateItem.description ? (
      <View style={{ flexDirection: "row", marginBottom: 18 }}>
        <Ionicons
          name={"document-text"}
          size={30}
          color="#104e54"
          style={{ paddingRight: 8 }}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#104e54",
            flexWrap: "wrap",
            flex: 1,
          }}
        >
          {updateItem.description.charAt(0).toUpperCase() +
            updateItem.description.slice(1)}
        </Text>
      </View>
    ) : (
      ""
    )}
    {updateItem.created ? (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name={"time"}
          size={30}
          color="#104e54"
          style={{ paddingRight: 8 }}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#104e54",
            flexWrap: "wrap",
            flex: 1,
          }}
        >
          {updateItem.created}
        </Text>
      </View>
    ) : (
      ""
    )}
  </View>)

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
      <Modal
        visible={info}
        statusBarTranslucent={true}
        animationType="slide"
        style={{ backgroundColor: "#f00" }}
      >
        <View style={{ height: "100%", backgroundColor: "#d1e6f0" }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: "6%" }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                alignSelf: "center",
                marginVertical: 30,
              }}
            >
              Image Details
            </Text>
            {infoContainer}
            {infoContainer}
            {infoContainer}
            <Map
              style={{ marginVertical: "5%" }}
              latitude={updateItem.latitude}
              longitude={updateItem.longitude}
            />
          </ScrollView>
        </View>
        <Pressable
          onPress={showInfo}
          style={{
            alignSelf: "center",
            backgroundColor: "#12b2e3",
            paddingHorizontal: 25,
            paddingVertical: 10,
            borderRadius: 50,
            marginVertical: 20,
            position: "absolute",
            bottom: 0,
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Close</Text>
        </Pressable>
      </Modal>
      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, { backgroundColor: "#4e8291" }]}
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
          onPress={showInfo}
        >
          <Text style={styles.buttonText}>More Info</Text>
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
