import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import ImageViewer from "react-native-image-zoom-viewer";
import moment from "moment/moment";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Map from "../components/Map.js";
import InfoContainer from "../components/InfoContainer.js";

function FullImg({ route }) {
  const { item, urls, data } = route.params;
  const [modalState, setModalState] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [updateItem, setUpdateItem] = useState(item);
  const [info, setInfo] = useState(false);
  const toast = useToast();
  const location =
    (updateItem.city ? updateItem.city + ", " : "") +
    (updateItem.country ? updateItem.country : "");

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
    <View style={{ flex: 1, backgroundColor: "#c3eaf1" }}>
      <Modal
        visible={modalState}
        statusBarTranslucent={true}
        animationType="fade"
        style={{ justifyContent: "center", height: "100%" }}
        transparent={true}
      >
        <View style={{ backgroundColor: "#152527e5", height: "100%" }}>
          <ImageViewer
            imageUrls={[urls[itemIndex(updateItem)]]}
            renderIndicator={() => {}}
            backgroundColor="#40556000"
            saveToLocalByLongPress={false}
            onClick={toggleModal}
            style={{ justifyContent: "center" }}
          />
        </View>
      </Modal>
      <ImageViewer
        imageUrls={urls}
        renderIndicator={() => {}}
        backgroundColor="#e8fcff"
        saveToLocalByLongPress={false}
        onClick={toggleModal}
        index={itemIndex(item)}
        style={{ justifyContent: "center" }}
        onChange={async (index) => {
          setUpdateItem(data[index]);
          await retrieve();
        }}
      />
      <Modal
        visible={info}
        statusBarTranslucent={true}
        animationType="slide"
        style={{ backgroundColor: "#f00" }}
      >
        <View style={{ backgroundColor: "#c3eaf1", height: "100%" }}>
          <View
            style={{
              height: "85%",
              borderRadius: 25,
              margin: "6%",
              overflow: "hidden",
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: "25%" }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "#104e54",
                  alignSelf: "center",
                  marginVertical: 30,
                }}
              >
                Image Details
              </Text>
              <InfoContainer
                author={updateItem.author}
                description={updateItem.description}
                created={updateItem.created}
                dimensions={updateItem.dimensions}
                exif={updateItem.exif}
                location={location}
              />
              <Map
                style={{ marginVertical: "5%" }}
                latitude={updateItem.latitude}
                longitude={updateItem.longitude}
                url={updateItem.img}
              />
            </ScrollView>
          </View>
        </View>
        <Pressable
          onPress={showInfo}
          style={{
            alignSelf: "center",
            backgroundColor: "#108e87aa",
            paddingHorizontal: 25,
            paddingVertical: 10,
            borderRadius: 50,
            marginVertical: 20,
            position: "absolute",
            bottom: 5,
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Close</Text>
        </Pressable>
      </Modal>
      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, { backgroundColor: "#108e87aa" }]}
          onPress={handleDownload}
        >
          <Text style={[styles.buttonText]}>Download</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: "#108e87aa" }]}
          onPress={showInfo}
        >
          <Text style={styles.buttonText}>Details</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleFavorite}>
          <Ionicons
            name={favorite ? "star" : "star-outline"}
            size={30}
            color="#104e54dd"
          />
        </Pressable>
      </View>
      <Text style={styles.info}>Photographer: {updateItem.author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    fontSize: 18,
    color: "#106e74a6",
    margin: 15,
    alignSelf: "center",
  },
  buttonRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  button: {
    borderRadius: 50,
    alignSelf: "center",
    padding: 8,
    margin: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
});

export default FullImg;
