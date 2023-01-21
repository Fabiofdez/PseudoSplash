import React, { useState, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import { UNSPLASH_URL } from "@env";

function Home({ navigation }) {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const updateData = () => {
    fetchRandomImage();
  };

  const fetchRandomImage = async () => {
    try {
      const response = await axios.get(UNSPLASH_URL);
      const newData = response.data.map((item) => {
        return {
          id: item.id,
          img: item.urls.regular,
          author: item.user.name,
          download: item.links.download,
        };
      });
      setData([...data, ...newData]);
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        extraData={data}
        onEndReached={() => updateData()}
        renderItem={({ item }) => 
          <Pressable onPress={() => navigation.navigate("FullImg", {item: item})}>
            <Image style={styles.item} source={{ uri: item.img }} />
          </Pressable>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '-7%',
    height: "100%",
    width: "100%",
    backgroundColor: "#f0f0f0",
    alignItems: 'center'
  },
  item: {
    flex: 1,
    width: (Dimensions.get('window').width / 2) - 20,
    height: undefined,
    aspectRatio: 1,
    margin: 7,
    borderRadius: 10,
  },
});

export default Home;