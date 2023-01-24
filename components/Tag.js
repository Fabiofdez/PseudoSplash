import { Component } from "react";
import { StyleSheet, Pressable, Text } from "react-native";

export default class Tag extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const active = this.props.isActive;
    const fillColor = active ? "#5ebbc4" : "#d1e6f0";
    const borderColor = active ? "#5ebbc4" : "#508e94";
    const labelColor = active ? "#000" : "#408086";
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
    borderColor: "#508e94",
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
