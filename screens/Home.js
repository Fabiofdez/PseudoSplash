import React, { useState, useEffect } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
  View,
} from "react-native";
import { SearchBar } from "react-native-elements";
import axios from "axios";

import { API_ID } from "@env";
import TagBar from "../components/TagBar";
import { Ionicons } from "@expo/vector-icons";

function Home({ navigation }) {
  const UNSPLASH_URL = "https://api.unsplash.com/photos/random?count=50&";
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  let API_URL = UNSPLASH_URL + API_ID;

  useEffect(() => {
    fetchRandomImage("");
  }, []);

  const updateData = () => {
    fetchRandomImage(query || selected);
  };

  const getItem = (item) => {
    return {
      id: item.id,
      img: item.urls.regular,
      author: item.user.name,
      download: item.links.download,
    };
  };

  const makeSelection = async (val) => {
    if (selected === val) {
      setSelected("");
      setData([...oldData]);
      return;
    }
    if (selected === "") {
      setOldData([...data]);
    }
    setQuery("");
    setSelected(val);
    fetchNew(val);
  };

  const handleSearch = async (val) => {
    setSelected("");
    setOldData([...data]);
    fetchNew(val);
  };

  const fetchNew = async (val) => {
    console.log(val);
    API_URL = UNSPLASH_URL + API_ID + "&query=" + val;
    try {
      const response = await axios.get(API_URL);
      const newData = response.data.map(getItem);
      setData([...newData]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRandomImage = async (val) => {
    console.log(val);
    API_URL = UNSPLASH_URL + API_ID + "&query=" + val;
    try {
      const response = await axios.get(API_URL);
      const newData = response.data.map(getItem);
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

  const cancelSearch = () => {
    setData([...oldData]);
    setQuery("");
  };

  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInput}
        searchIcon={<Ionicons name="search" size={24} color="#104e54" />}
        clearIcon={
          <Ionicons
            name="close"
            color="#104e54"
            size={24}
            onPress={cancelSearch}
            style={{ opacity: query === "" ? 0 : 100 }}
          />
        }
        inputStyle={{ color: "#104e54", fontSize: 21 }}
        placeholderTextColor="#104e54"
        placeholder="Search images..."
        cursorColor="#306e74"
        onChangeText={setQuery}
        onSubmitEditing={() => handleSearch(query)}
        value={query}
      />
      <TagBar select={makeSelection} selected={selected} height="7%" />
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
        onRefresh={() => fetchNew(query || selected)}
        refreshing={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  searchContainer: {
    alignContent: "center",
    width: "100%",
    backgroundColor: "#d1e6f0",
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  searchInput: {
    position: "relative",
    backgroundColor: "#508e9469",
    borderRadius: 50,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
});

export default Home;
