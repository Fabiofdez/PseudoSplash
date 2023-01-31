import { Image, View } from "react-native";
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
          style={[
            this.props.style,
            {
              borderRadius: 35,
              overflow: "hidden",
              borderWidth: 15,
              borderColor: "#508e9477",
            },
          ]}
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
              <View
                style={{
                  alignItems: "center",
                  shadowColor: "black",
                  shadowOpacity: 0.26,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 10,
                  elevation: 3,
                }}
              >
                <Ionicons
                  name="location-sharp"
                  size={80}
                  color="#fff"
                />
                <Image
                  source={{ uri: this.props.url }}
                  style={{
                    borderRadius: 50,
                    width: "80%",
                    height: undefined,
                    aspectRatio: 1,
                    overflow: "hidden",
                    flex: 1,
                    borderColor: "#fff",
                    borderWidth: 5,
                    position: "absolute",
                  }}
                />
              </View>
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
