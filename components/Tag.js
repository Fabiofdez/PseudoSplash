import { Component } from "react";
import { StyleSheet, Pressable, Text } from "react-native";

export default class Tag extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const active = this.props.isActive;
    const fillColor = active ? "#5ecac0" : "#00000000";
    const borderColor = active ? "#5ecac0" : "#106e74dd";
    const labelColor = active ? "#000" : "#106e74";
    return (
      <Pressable
        style={[
          styles.tag,
          { backgroundColor: fillColor, borderColor: borderColor },
        ]}
        onPress={this.props.onPress}
      >
        <Text style={[styles.tagText, { color: labelColor }]}>
          {this.props.label}
        </Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  tag: {
    flex: 2,
    borderRadius: 100,
    borderWidth: 2.5,
    justifyContent: "center",
    marginHorizontal: 3,
  },
  tagText: {
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 12,
  },
});
