import Home from "./screens/Home.js";
import Favorites from "./screens/Favorites.js";
import FullImg from "./screens/FullImg.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ToastProvider } from "react-native-toast-notifications";
import { StyleSheet, View, Text } from "react-native";

const HomeStack = createNativeStackNavigator();
const FavoriteStack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Home" 
        component={Home} 
        options={{
          title: "Wallpapers", 
          headerTitleAlign: 'center',
          headerTitleStyle: {fontWeight: 'bold'}
        }}
      />
      <HomeStack.Screen 
        name="FullImg" 
        component={FullImg} 
        options={{title: "Image Details"}} 
      />
    </HomeStack.Navigator>
  )
}

function FavoriteScreen() {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen 
        name="Favorites" 
        component={Favorites} 
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {fontWeight: 'bold'}
        }}
      />
      <FavoriteStack.Screen 
        name="FullImg" 
        component={FullImg} 
        options={{title: "Image Details"}} 
      />
    </FavoriteStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

export default function App() {
  
  return (
    <ToastProvider
      renderType={{
        rounded_toast: (toast) => (
          <View style={styles.toast}>
            <Text style={styles.text}>
              {toast.message}
            </Text>
          </View>
        )
      }}
      swipeEnabled={true}
      duration={1500}
    >
      <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen 
            name="HomeScreen" 
            component={HomeScreen} 
          />
          <Tab.Screen 
            name="FavoriteScreen" 
            component={FavoriteScreen} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );

}

const styles = StyleSheet.create({
  toast: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 50,
    backgroundColor: '#202020ca',
    marginBottom: '14%'
  },
  text: {
    color: '#fff',
    fontSize: 16, 
  }
})

