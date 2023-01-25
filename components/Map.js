import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { Component } from "react";

export default class renderMap extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const renderMap =
      this.props.latitude !== null &&
      this.props.longitude !== null &&
      this.props.latitude !== 0 &&
      this.props.longitude !== 0;
    let map;

    if (renderMap) {
      map = (
        <View
          style={{
            borderRadius: 35,
            overflow: "hidden",
            borderWidth: 15,
            borderColor: "#508e9477",
            margin: this.props.style.margin,
          }}
        >
          <MapView
            style={{
              height: undefined,
              width: "100%",
              aspectRatio: 1,
              alignSelf: "center",
            }}
            initialRegion={{
              latitude: this.props.latitude,
              longitude: this.props.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: this.props.latitude,
                longitude: this.props.longitude,
              }}
            >
              <Ionicons
                name="location-sharp"
                size={50}
                color={this.props.pinColor}
              />
            </Marker>
          </MapView>
        </View>
      );
    } else {
      map = <></>;
    }

    return <>{map}</>;
  }
}
