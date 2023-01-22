import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Modal, Pressable } from "react-native";
import { useToast } from "react-native-toast-notifications";
import ImageViewer from "react-native-image-zoom-viewer";
import moment from "moment/moment";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";

function FullImg({ route }) {
  const { item, urls, data } = route.params;
  const [modalState, setModalState] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [updateItem, setUpdateItem] = useState(item);
  const toast = useToast();
  let favData = [];
  const position = 0;

  useEffect(() => {
    const retrieve = async () => {
      await getFavorites();
      setFavorite(imgSaved() >= 0);
    };
    retrieve();
  }, []);

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
      await FileSystem.downloadAsync(item.download, fileUri);
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
      (element) => JSON.stringify(element) === JSON.stringify(item)
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
      favData.push(item);
    }
    AsyncStorage.setItem("favorites", JSON.stringify(favData));
  };

  const toggleModal = () => {
    setModalState(!modalState);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#d1e6f0" }}>
      <Modal
        visible={modalState}
        statusBarTranslucent={true}
        presentationStyle="fullScreen"
        animationType="fade"
        style={{ justifyContent: "center" }}
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
        onChange={(index) => {
          setUpdateItem(data[index]);
        }}
        onSwipeDown={toggleModal}
      />
      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, { backgroundColor: "#0070e6" }]}
          onPress={handleDownload}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>Download</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: favorite ? "#df4a8980" : "#00000035" },
          ]}
          onPress={handleFavorite}
        >
          <Text style={styles.buttonText}>
            {favorite ? "Saved" : "Favorite"}
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
    alignContent: "space-around",
    width: "100%",
  },
  button: {
    marginVertical: 15,
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default FullImg;
