import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import emptyFolder from "../assets/emptyFolder.png";

function Favorites({ navigation }) {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const retrieve = async () => {
      await fetchFavorites();
    };
    isFocused && retrieve();
  }, [isFocused]);

  const fetchFavorites = async () => {
    try {
      const favFile = await AsyncStorage.getItem("favorites");
      setData(Array.from(JSON.parse(favFile || "[]")));
    } catch (error) {
      console.log(error);
    }
  };

  function favEmpty() {
    return data.length > 0;
  }

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
      <View height={favEmpty() ? 0 : "auto"} alignItems="center">
        <Image
          source={emptyFolder}
          style={[{ width: favEmpty() ? 0 : "75%" }, styles.emptyImg]}
        />
        <Text style={styles.emptyText}>Nothing Saved Yet</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        extraData={data}
        contentContainerStyle={{ paddingVertical: "2%" }}
        showsVerticalScrollIndicator={false}
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
        onRefresh={() => fetchFavorites()}
        refreshing={false}
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
    backgroundColor: "#e8fcff",
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
  emptyImg: {
    marginTop: "20%",
    height: undefined,
    aspectRatio: 1,
  },
  emptyText: {
    color: "#508e9487",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
});

export default Favorites;
