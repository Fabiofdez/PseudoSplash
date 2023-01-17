import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, Image } from "react-native";
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
          width: item.width, 
          height: item.height,
          img: item.urls.regular,
          author: item.user.name,
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
        style={{marginTop: -30}}
        data={data}
        renderItem={({ item }) => <Pressable onPress={() => navigation.navigate("FullImg", {item: item})}><Image style={styles.item} source={{ uri: item.img }} /></Pressable>}
        keyExtractor={(item) => item.id}
        numColumns={2}
        extraData={data}
        onEndReached={() => updateData()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
    width: "100%",
    backgroundColor: "#f0f0f0",
  },
  item: {
    flex: 1,
    width: 170,
    height: undefined,
    aspectRatio: 1,
    marginTop: 20,
    margin: 10,
    borderRadius: 10,
  },
});

export default Home;