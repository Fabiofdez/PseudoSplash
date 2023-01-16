import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpoFastImage from 'expo-fast-image';

/*
Steps:
1. fetch random image from unsplash
2. add image to DATA array
3. render image in FlatList
*/

const DATA = [
  {
    id: "3WXAJndXvCY",
    img: "https://images.unsplash.com/photo-1672073313545-751c5c93891d?ixid=MnwzOTk0NzZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzM4MzM5NTA&ixlib=rb-4.0.3",
    author: "Khaled Ali",
  }
]
function Home() {
  const renderItem = ({ id, img }) => (
    <Pressable>
      <ExpoFastImage
        uri={img}
        cachekey={id}
        style={styles.item}
        />
    </Pressable>
  );
  return (
    <SafeAreaView>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 150,
    height: 150,
    margin: 10,
  },
});

export default Home;