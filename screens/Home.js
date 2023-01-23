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
  const UNSPLASH_URL = "https://api.unsplash.com/photos/random?count=50&"
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  let API_URL = UNSPLASH_URL + API_ID;

  /*
  const options = [
    { key: "1", value: "Nature" },
    { key: "2", value: "Street Photography" },
    { key: "3", value: "Animals" },
    { key: "4", value: "People" },
    { key: "5", value: "Arts & Culture" },
    { key: "6", value: "Wallpapers" },
  ];*/

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const makeSelection = async (val) => {
    console.log(val);
    if (selected === val) {
      setSelected("");
      setData([...oldData]);
      return;
    }
    setSelected(val);
    API_URL = UNSPLASH_URL + API_ID + "&query="+val;
    setOldData([...data]);
    try {
      const response = await axios.get(API_URL);
      const newData = response.data.map(funcName);
      setData([...newData]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (val) => {
    API_URL = UNSPLASH_URL + API_ID + "&query="+val;
    setOldData([...data]);
    try {
      const response = await axios.get(API_URL);
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
      const response = await axios.get(API_URL);
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
        onChangeText={setQuery}
        onSubmitEditing={() => handleSearch(query)}
        value={query}
        onClear={() => setData([...oldData])}
      />
      <ScrollView 
        style={styles.tagBar}
        horizontal={true}
        contentContainerStyle={{paddingHorizontal: 10}}
        showsHorizontalScrollIndicator={false}
      >
        <Pressable style={styles.tag} onPress={() => makeSelection("Nature")}>
          <Text style={styles.tagText}>Nature</Text>
        </Pressable>
        <Pressable style={styles.tag} onPress={() => makeSelection("Street Photography")}>
          <Text style={styles.tagText}>Street Photography</Text>
        </Pressable>
        <Pressable style={styles.tag} onPress={() => makeSelection("People")}>
          <Text style={styles.tagText}>People</Text>
        </Pressable>
        <Pressable style={styles.tag} onPress={() => makeSelection("Animals")}>
          <Text style={styles.tagText}>Animals</Text>
        </Pressable>
        <Pressable style={styles.tag} onPress={() => makeSelection("Arts & Culture")}>
          <Text style={styles.tagText}>Arts & Culture</Text>
        </Pressable>
        <Pressable style={styles.tag} onPress={() => makeSelection("Wallpapers")}>
          <Text style={styles.tagText}>Wallpapers</Text>
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
    minHeight: "6.5%",
    maxHeight: "6.5%",
    paddingTop: 8,
    width: "100%",
    flexWrap: "wrap",
    backgroundColor: "#d1e6f0",
  },
  tag: { 
    backgroundColor: "#40a7b369", 
    borderRadius: 50, 
    justifyContent: "center",
    marginHorizontal: 4,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 15,
    paddingHorizontal: 18, 
    paddingVertical: 5
  }
});

export default Home;
