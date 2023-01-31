import { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Tag from "./Tag";

export default class TagBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container} height={this.props.height || "7%"}>
        <View style={styles.tagBar}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Tag
              label="Nature"
              onPress={() => this.props.select("Nature")}
              isActive={this.props.selected === "Nature"}
            />
            <Tag
              label="Street Photography"
              onPress={() => this.props.select("Street Photography")}
              isActive={this.props.selected === "Street Photography"}
            />
            <Tag
              label="People"
              onPress={() => this.props.select("People")}
              isActive={this.props.selected === "People"}
            />
            <Tag
              label="Animals"
              onPress={() => this.props.select("Animals")}
              isActive={this.props.selected === "Animals"}
            />
            <Tag
              label="Arts & Culture"
              onPress={() => this.props.select("Arts & Culture")}
              isActive={this.props.selected === "Arts & Culture"}
            />
            <Tag
              label="Wallpapers"
              onPress={() => this.props.select("Wallpapers")}
              isActive={this.props.selected === "Wallpapers"}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#c3eaf1",
    paddingHorizontal: 6,
  },
  tagBar: {
    height: "100%",
    borderColor: "#c3eaf1",
    borderWidth: 10,
    borderRadius: 100,
    overflow: "hidden",
  },
});
