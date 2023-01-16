import { Text } from "react-native";
import ExpoFastImage from 'expo-fast-image';

function Home() {
  return (
    <ExpoFastImage
      uri="https://cdn-icons-png.flaticon.com/512/919/919851.png"
      style={{width: 300, height: 300}}
    />
  );
}

export default Home;