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
import { RefreshControl } from "react-native";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function Favorites({ navigation }) {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && fetchFavorites();
  }, [isFocused]);

  const fetchFavorites = async () => {
    try {
      const favFile = await AsyncStorage.getItem("favorites");
      setData(Array.from(JSON.parse(favFile)));
    } catch (error) {
      console.log(error);
    }
  };

  function favEmpty() {
    return data.length > 0 ? 0 : 100;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        extraData={data}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("FullImg", { item: item })}
          >
            <Image style={styles.item} source={{ uri: item.img }} />
          </Pressable>
        )}
        onRefresh={() => fetchFavorites()}
        refreshing={false}
      />
      <View style={styles.empty}>
        <FontAwesome
          name="star-half-empty"
          size={150}
          color="black"
          style={{ opacity: favEmpty() }}
        />
        <Text style={{ opacity: favEmpty() }}>
          You do not have any favorites!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "-7%",
    height: "100%",
    width: "100%",
    backgroundColor: "#f0f0f0",
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
  empty: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Favorites;
