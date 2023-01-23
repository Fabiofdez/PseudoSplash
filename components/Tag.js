import { Component } from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";

export default class Tag extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const active = this.props.isActive;
    return (
      <View
        style={[
          styles.tag,
          {
            backgroundColor: active ? "#5ebbc4" : "#508e94",
          },
        ]}
      >
        <Pressable
          style={[
            styles.tag,
            {
              backgroundColor: active ? "#00000000" : "#d1e6f0",
            },
          ]}
          onPress={this.props.onPress}
        >
          <Text
            style={[
              styles.tagText,
              {
                color: active ? "#000" : "#508e94",
              },
            ]}
          >
            {this.props.label}
          </Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
