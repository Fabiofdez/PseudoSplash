import { useState } from "react";
import { Text, Image, View, StyleSheet, Modal, Pressable } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from 'expo-media-library';
import moment from "moment/moment";

function FullImg({ route }) {
  const { item } = route.params;
  const [ modalState, setModalState ] = useState(false);

  const handleDownload = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const date = moment().format('YYYYMMDD_hhmmss');
        const fileUri = `${FileSystem.documentDirectory}${date}.png`;
        await MediaLibrary.saveToLibraryAsync(fileUri);
        console.log("Image successfully saved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setModalState(!modalState);
  };
  
  return (  
      <View style={{flex: 1}} >
        <Modal 
          visible={ modalState }
          statusBarTranslucent={true}
          presentationStyle='fullScreen'
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
        />
        <Text style={styles.item}>
          Photographer: {item.author}{"\n"}
          {item.width} x {item.height}
        </Text>
        <Pressable style={styles.button} onPress={handleDownload}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Download</Text>
        </Pressable>
      </View>
  );  
}


const styles = StyleSheet.create({
  image: {
    width: 'auto',
    height: '90%',
    margin: 0,
    adjustContent: "center",
    alignItems: "center",
  },
  item: {
    fontSize: 18,
    color: "#808080",
    margin: 15,
    alignContent: 'flex-start'
  },
  buttonImg: {
    width: '10%',
    height: undefined,
    aspectRatio: 1,
  },
  button: {
    backgroundColor: '#00000035',
    marginLeft: 15,
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 12,
  }
});

export default FullImg;