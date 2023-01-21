import { useState } from "react";
import { Text, View, StyleSheet, Modal, Pressable } from "react-native";
import { useToast } from "react-native-toast-notifications";
import ImageViewer from "react-native-image-zoom-viewer";
import moment from "moment/moment";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from "@react-native-async-storage/async-storage";

function FullImg({ route }) {
  const { item } = route.params;
  const [ modalState, setModalState ] = useState(false);
  const toast = useToast();
  var favData = [];
  
  const getFavorites = async () => {
    var favFile = await AsyncStorage.getItem('favorites');
    if (favFile != null) {
      favData = Array.from(JSON.parse(favFile));
    }
  }
  
  const handleDownload = async () => {
    var date = moment().format('YYYYMMDD_hhmmss');
    var fileUri = `${FileSystem.documentDirectory}${date}.png`;
    
    try {
      await MediaLibrary.requestPermissionsAsync();
      await FileSystem.downloadAsync(item.download, fileUri);
      try {
        await MediaLibrary.createAssetAsync(fileUri);
        toast.show('Image Downloaded', {type: 'rounded_toast'});
      } catch (err) {
        console.log("Save err: ", err);
      }
    } catch (err) {
      console.log("Write: ", err);
    }
  }
  
  function imgSaved() {
    return favData.findIndex(
      element => JSON.stringify(element) === JSON.stringify(item)
    );
  }
  
  const handleFavorite = async () => {
    await getFavorites();
    if (imgSaved() >= 0) {
      toast.show('Image Removed from Favorites', {type: 'rounded_toast'});
      favData.splice(imgSaved(), 1);
    } else {
      toast.show('Image Added to Favorites', {type: 'rounded_toast'});
      favData.push(item);
    }
    AsyncStorage.setItem('favorites', JSON.stringify(favData));
  }

  const toggleModal = () => {
    setModalState(!modalState);
  };
  
  return (  
    <View style={{flex: 1}} >
      <Modal 
        visible={ modalState }
        statusBarTranslucent={true}
        presentationStyle='fullScreen'
        animationType='fade'
        style={{justifyContent: 'center'}}
      >
        <ImageViewer 
          imageUrls={[{url: item.img}]}
          renderIndicator={() => {}}
          backgroundColor='#606060'
          saveToLocalByLongPress={false}
          onClick={ toggleModal }
        />
      </Modal>
      <ImageViewer 
        imageUrls={[{url: item.img}]}
        renderIndicator={() => {}}
        backgroundColor='#f0f0f0'
        saveToLocalByLongPress={false}
        onClick={ toggleModal }
        style={{justifyContent: 'center'}}
      />
      <Text style={styles.item}>
        Photographer: {item.author}
      </Text>
      <View style={styles.buttonRow}>
        <Pressable 
          style={[styles.button, {backgroundColor: '#0070e6'}]} 
          onPress={handleDownload}>
          <Text style={[styles.buttonText, {color: '#fff'}]}>Download</Text>
        </Pressable>
        <Pressable 
          style={[styles.button, {backgroundColor: (imgSaved() >= 0) ? '#df4a8980': '#00000035'}]} 
          onPress={handleFavorite}>
          <Text style={styles.buttonText}>{(imgSaved() >= 0) ? 'Saved' : 'Favorite'}</Text>
        </Pressable>
      </View>
    </View>
  );  
}


const styles = StyleSheet.create({
  item: {
    fontSize: 18,
    color: "#808080",
    margin: 15,
    alignContent: 'flex-start'
  },
  buttonRow: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignContent: 'space-around',
    width: '100%'
  },
  button: {
    marginLeft: 15,
    marginBottom: 20,
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 12,
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: 20, 
    fontWeight: 'bold'
  }
});

export default FullImg;