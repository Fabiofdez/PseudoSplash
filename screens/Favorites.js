import React, { useState, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Image, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import emptyFolder from '../assets/emptyFolder.png'
import { RefreshControl } from "react-native";
import { View } from "react-native";

function Favorites({navigation}) {
  const [data, setData] = useState([]);
  var favorites = [];

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const favFile = await AsyncStorage.getItem('favorites');
      favorites = Array.from(JSON.parse(favFile));
      setData(favorites);
    } catch (error) {
      console.log(error);
    }
  };

  function favEmpty() {
    console.log(favorites);
    return (favorites.length > 0) ? 0 : 100;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        extraData={data}
        renderItem={({ item }) => 
        <Pressable onPress={() => navigation.navigate("FullImg", {item: item})}>
          <Image style={styles.item} source={{ uri: item.img }} />
        </Pressable>}
      />
      <View>
        <Image source={emptyFolder} style={{opacity: favEmpty()}}/>
      </View>
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

export default Favorites;