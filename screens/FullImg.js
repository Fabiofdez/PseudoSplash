import { Text, Image, View, StyleSheet, Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

function FullImg({ route }) {
  const { item } = route.params;
  let modalState = false;

  return (
  
      <View style={{flex: 1}}>
        <Modal visible={ modalState }>
          <ImageViewer 
            imageUrls={[{url: item.img}]}
            // onClick={} ??
          />
        </Modal>
        <ImageViewer 
          imageUrls={[{url: item.img}]}
          backgroundColor='#f0f0f0'
          // onClick={} ??
        />
        <Text style={styles.item}>Photographer: {item.author}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 'auto',
    height: '100%',
    margin: 0,
    adjustContent: "center",
    alignItems: "center",
  },
  item: {
    fontSize: 18,
    color: "#808080",
    margin: 10,
    alignContent: 'flex-start'
  }
});

export default FullImg;