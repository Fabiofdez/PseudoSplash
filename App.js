import Home from "./screens/Home.js";
import FullImg from "./screens/FullImg.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            title: "Wallpapers", 
            headerTitleAlign: 'center',
            headerTitleStyle: ',bold,,' 
          }}
        />
        <Stack.Screen 
          name="FullImg" 
          component={FullImg} 
          options={{title: "Image Details"}} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

