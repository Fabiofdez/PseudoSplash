import React, { useState, useEffect } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { SelectList } from "react-native-dropdown-select-list";

import { UNSPLASH_URL } from "@env";

function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");
  const API_URL = `${UNSPLASH_URL}&query=${selected}`;

  const options = [
    { key: "1", value: "Nature" },
    { key: "2", value: "Street Photography" },
    { key: "3", value: "Animals" },
    { key: "4", value: "People" },
    { key: "5", value: "Arts & Culture" },
    { key: "6", value: "Wallpapers" },
  ];

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const makeSelection = (val) => {
    setSelected(val);
    setAPI_URL(UNSPLASH_URL + val);
    setData([]);
    fetchRandomImage();
  };

  const updateData = () => {
    fetchRandomImage();
  };

  const fetchRandomImage = async () => {
    try {
      const response = await axios.get(API_URL);
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

  const urls = () => {
    const urls = data.map((item) => {
      return {
        url: item.img,
      };
    });
    return urls;
  };

  return (
    <SafeAreaView style={styles.container}>
      <SelectList
        setSelected={(val) => makeSelection(val)}
        data={options}
        save="value"
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        extraData={data}
        onEndReached={() => updateData()}
        contentContainerStyle={{ paddingVertical: 7 }}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "-7%",
    height: "100%",
    width: "100%",
    backgroundColor: "#f5fcff",
    alignItems: "center",
  },
  item: {
    flex: 1,
    width: Dimensions.get("window").width / 2 - 20,
    height: undefined,
    aspectRatio: 1,
    margin: 7,
    borderRadius: 10,
  },
});

export default Home;
