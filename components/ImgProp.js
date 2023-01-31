import { Component } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class ImgProp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <Ionicons
          name={this.props.icon}
          size={30}
          color="#104e54"
          style={{ paddingRight: 12 }}
        />
        {this.props.alt_content ? (
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#104e54",
                flex: 1,
              }}
            >
              {this.props.content}
            </Text>
            {this.props.alt_content ? (
              <Text
                style={{
                  fontSize: 14,
                  color: "#104e54",
                  flex: 1,
                }}
              >
                {this.props.alt_content}
              </Text>
            ) : (
              <></>
            )}
          </View>
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#104e54",
              alignSelf: this.props.align,
              flex: 1,
            }}
          >
            {this.props.content}
          </Text>
        )}
      </View>
    );
  }
}
