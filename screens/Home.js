import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import { UNSPLASH_URL } from "@env";

function Home() {
  const [data, setData] = useState([])
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const updateData = () => {
    setIsFetching(true);
    fetchRandomImage();
  };

  const fetchRandomImage = async () => {
    try {
      const response = await axios.get(UNSPLASH_URL);
      const newData = response.data.map((item) => {
        return {
          id: item.id,
          img: item.urls.small,
          author: item.user.name,
        };
      });
      setData([...data, ...newData]);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Pressable><Image style={styles.item} source={{ uri: item.img }} /></Pressable>}
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
    height: "100%",
    width: "100%",
    backgroundColor: "#a9a9a9",
  },
  item: {
    width: 190,
    height: 190,
    margin: 10,
    borderRadius: 10,
    flex: 1,
  },
});

export default Home;