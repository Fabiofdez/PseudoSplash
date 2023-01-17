import Home from "./screens/Home.js";
import FullImg from "./screens/FullImg.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  const options = {
    title: "Full Image"
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FullImg" component={FullImg} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

