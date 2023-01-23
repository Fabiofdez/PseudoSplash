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
import { SearchBar } from "react-native-elements";
import axios from "axios";

import { API_ID } from "@env";

function Home({ navigation }) {
  const UNSPLASH_URL = "https://api.unsplash.com/photos/random?count=50&";
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  let API_URL = UNSPLASH_URL + API_ID;

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const makeSelection = async (val) => {
    if (selected === val) {
      setSelected("");
      setData([...oldData]);
      return;
    }
    setSelected(val);
    API_URL = UNSPLASH_URL + API_ID + "&query=" + val;
    setOldData([...data]);
    try {
      const response = await axios.get(API_URL);
      const newData = response.data.map(getItem);
      setData([...newData]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (val) => {
    API_URL = UNSPLASH_URL + API_ID + "&query=" + val;
    setOldData([...data]);
    try {
      const response = await axios.get(API_URL);
      const newData = response.data.map(getItem);
      setData([...newData]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = () => {
    API_URL = UNSPLASH_URL + API_ID + "&query=" + selected;
    fetchRandomImage();
  };

  const getItem = (item) => {
    return {
      id: item.id,
      img: item.urls.regular,
      author: item.user.name,
      download: item.links.download,
    };
  };

  const fetchRandomImage = async () => {
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

  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={{
          alignContent: "center",
          width: "100%",
          backgroundColor: "#d1e6f0",
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
        inputContainerStyle={{
          position: "relative",
          backgroundColor: "#508e9488",
          borderRadius: 50,
          paddingHorizontal: 10,
          marginHorizontal: 15,
        }}
        placeholderTextColor="#104e54"
        placeholder="Search for images..."
        searchIcon={{ color: "#104e54", size: 25 }}
        cursorColor="#306e74"
        onChangeText={setQuery}
        onSubmitEditing={() => handleSearch(query)}
        value={query}
        onClear={() => setData([...oldData])}
      />
      <ScrollView
        style={styles.tagBar}
        horizontal={true}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={[
            styles.tag,
            { backgroundColor: selected === "Nature" ? "#5ebbc4" : "#508e94" },
          ]}
        >
          <Pressable
            style={[
              styles.tag,
              {
                backgroundColor:
                  selected === "Nature" ? "#00000000" : "#d1e6f0",
              },
            ]}
            onPress={() => makeSelection("Nature")}
          >
            <Text
              style={[
                styles.tagText,
                { color: selected === "Nature" ? "#000" : "#508e94" },
              ]}
            >
              Nature
            </Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.tag,
            {
              backgroundColor:
                selected === "Street Photography" ? "#5ebbc4" : "#508e94",
            },
          ]}
        >
          <Pressable
            style={[
              styles.tag,
              {
                backgroundColor:
                  selected === "Street Photography" ? "#00000000" : "#d1e6f0",
              },
            ]}
            onPress={() => makeSelection("Street Photography")}
          >
            <Text
              style={[
                styles.tagText,
                {
                  color: selected === "Street Photography" ? "#000" : "#508e94",
                },
              ]}
            >
              Street Photography
            </Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.tag,
            { backgroundColor: selected === "People" ? "#5ebbc4" : "#508e94" },
          ]}
        >
          <Pressable
            style={[
              styles.tag,
              {
                backgroundColor:
                  selected === "People" ? "#00000000" : "#d1e6f0",
              },
            ]}
            onPress={() => makeSelection("People")}
          >
            <Text
              style={[
                styles.tagText,
                { color: selected === "People" ? "#000" : "#508e94" },
              ]}
            >
              People
            </Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.tag,
            { backgroundColor: selected === "Animals" ? "#5ebbc4" : "#508e94" },
          ]}
        >
          <Pressable
            style={[
              styles.tag,
              {
                backgroundColor:
                  selected === "Animals" ? "#00000000" : "#d1e6f0",
              },
            ]}
            onPress={() => makeSelection("Animals")}
          >
            <Text
              style={[
                styles.tagText,
                { color: selected === "Animals" ? "#000" : "#508e94" },
              ]}
            >
              Animals
            </Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.tag,
            {
              backgroundColor:
                selected === "Arts & Culture" ? "#5ebbc4" : "#508e94",
            },
          ]}
        >
          <Pressable
            style={[
              styles.tag,
              {
                backgroundColor:
                  selected === "Arts & Culture" ? "#00000000" : "#d1e6f0",
              },
            ]}
            onPress={() => makeSelection("Arts & Culture")}
          >
            <Text
              style={[
                styles.tagText,
                { color: selected === "Arts & Culture" ? "#000" : "#508e94" },
              ]}
            >
              Arts & Culture
            </Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.tag,
            {
              backgroundColor:
                selected === "Wallpapers" ? "#5ebbc4" : "#508e94",
            },
          ]}
        >
          <Pressable
            style={[
              styles.tag,
              {
                backgroundColor:
                  selected === "Wallpapers" ? "#00000000" : "#d1e6f0",
              },
            ]}
            onPress={() => makeSelection("Wallpapers")}
          >
            <Text
              style={[
                styles.tagText,
                { color: selected === "Wallpapers" ? "#000" : "#508e94" },
              ]}
            >
              Wallpapers
            </Text>
          </Pressable>
        </View>
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
    minHeight: "6%",
    maxHeight: "6%",
    paddingVertical: "1.5%",
    width: "100%",
    flexWrap: "wrap",
    backgroundColor: "#d1e6f0",
  },
  tag: {
    borderRadius: 50,
    justifyContent: "center",
    marginHorizontal: 3,
    paddingVertical: 3,
  },
  tagText: {
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 12,
  },
});

export default Home;
