import { Text, Image, View, StyleSheet } from "react-native";

function FullImg({ route }) {
  const { item } = route.params;
  return (
    <View>
      <Image style={styles.item} source={{ uri: item.img }} />
      <Text>Photographer: {item.author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "auto",
    height: "90%",
    margin: 10,
    adjustContent: "center",
    alignItems: "center",
  },
});

export default FullImg;