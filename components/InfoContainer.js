import { Component } from "react";
import { View } from "react-native";
import ImgProp from "./ImgProp";

export default class InfoContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const exif = this.props.exif;
    const make = JSON.stringify(exif.make).replace(/corporation/gi, "");
    const model = JSON.stringify(exif.model).replace(/corporation/gi, "");
    const cameraTitle =
      (exif.make &&
      !model.includes("NIKON") &&
      !model.includes("Canon") &&
      !model.includes("Nikon") &&
      !model.includes("LEICA")
        ? `${make.replace(/"/g, "")} `
        : "") + (exif.model ? `${model.replace(/"/g, "")}` : "");
    const cameraInfo =
      (exif.aperture ? `F${exif.aperture}   ` : "") +
      (exif.exposure_time ? `${exif.exposure_time}s   ` : "") +
      (exif.focal_length ? `${exif.focal_length}mm   ` : "") +
      (exif.iso ? `ISO ${exif.iso}` : "");

    return (
      <View
        style={{
          backgroundColor: "#508e9477",
          borderRadius: 35,
          paddingHorizontal: 25,
          paddingVertical: 15,
          marginBottom: "5%",
        }}
      >
        {this.props.author ? (
          <ImgProp content={this.props.author} icon="person" align="center" />
        ) : (
          <></>
        )}
        {this.props.description ? (
          <ImgProp content={this.props.description} icon="reader" />
        ) : (
          <></>
        )}
        {this.props.created[0] ? (
          <ImgProp content={this.props.created} icon="time" align="center" />
        ) : (
          <></>
        )}
        {this.props.exif.name ? (
          <ImgProp
            content={cameraTitle}
            alt_content={cameraInfo}
            icon="camera"
            align="center"
          />
        ) : (
          <></>
        )}
        {this.props.location ? (
          <ImgProp
            content={this.props.location}
            icon="location"
            align="center"
          />
        ) : (
          <></>
        )}
      </View>
    );
  }
}
