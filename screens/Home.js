import React, { useState, useEffect } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Text, 
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from 'react-native-elements';
import axios from "axios";

import { API_ID } from "@env";

function Home({ navigation }) {
  const UNSPLASH_URL = "https://api.unsplash.com/photos/random?count=10&"
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");
  let API_URL = UNSPLASH_URL + API_ID;

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const makeSelection = async (val) => {
    console.log(val);
    if (selected === val) {
      val = "";
    }
    setSelected(val);
    API_URL = UNSPLASH_URL + API_ID + "&query="+val;
    setData([]);
    try {
      //const response = await axios.get(API_URL);
      const newData = response.data.map(funcName);
      setData([...newData]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = () => {
    API_URL = UNSPLASH_URL + API_ID + "&query="+selected;
    console.log(selected);
    fetchRandomImage();
  };

  const funcName = (item) => {
    return {
      id: item.id,
      img: item.urls.regular,
      author: item.user.name,
      download: item.links.download,
    }
  }

  const fetchRandomImage = async () => {
    try {
      //const response = await axios.get(API_URL);
      const newData = response.data.map(funcName);
      setData([...data, ...newData]);
    } catch (error) {
      console.log(error);
    }
  };

  const urls = () => {
    const urls = data.map((item) => {
      return {
        url: item.img,
      };
    });
    return urls;
  };

  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={{width: "100%", backgroundColor: "#d1e6f0"}}
        inputContainerStyle={{position: "relative", width: "100%", backgroundColor: "#d1e6f0"}}
        placeholder="Search for images..."
        onChangeText={makeSelection}
        value={selected}
      />
      <ScrollView 
        style={styles.tagBar}
        horizontal={true}
      >
        <Pressable style={styles.tag} onPress={() => makeSelection("Nature")}>
          <Text style={{paddingHorizontal: 18, paddingVertical: 5}}>Nature</Text>
        </Pressable>
        <Pressable style={styles.tag} onPress={() => makeSelection("People")}>
          <Text style={{paddingHorizontal: 18, paddingVertical: 5}}>People</Text>
        </Pressable>
      </ScrollView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        extraData={data}
        onEndReached={updateData}
        contentContainerStyle={{ paddingVertical: "2%" }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("FullImg", {
                item: item,
                urls: urls(),
                data: data,
              })
            }
          >
            <Image style={styles.item} source={{ uri: item.img }} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "#f5fcff",
    alignItems: "center",
  },
  item: {
    flex: 1,
    width: Dimensions.get("window").width / 2.25,
    height: undefined,
    aspectRatio: 1,
    margin: 7,
    borderRadius: 10,
  },
  tagBar: {
    width: "100%", 
    maxHeight: "5%",
    backgroundColor: "#d1e6f0",
    paddingBottom: 8
  },
  tag: { 
    backgroundColor: "#00ffff", 
    borderRadius: 50, 
    justifyContent: "center",
    margin: "auto",
    marginHorizontal: 4
  }
});

export default Home;
