import Home from "./screens/Home.js";
import Favorites from "./screens/Favorites.js";
import FullImg from "./screens/FullImg.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ToastProvider } from "react-native-toast-notifications";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ToastProvider
      renderType={{
        rounded_toast: (toast) => (
          <View style={styles.toast}>
            <Text style={styles.toastText}>{toast.message}</Text>
          </View>
        ),
      }}
      swipeEnabled={true}
      duration={1500}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: '#f5fcff'},
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerText,
          headerShadowVisible: false,
        }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              title: "Wallpapers",
              headerRight: () => (
                <Pressable
                  onPress={() => {
                    navigation.navigate("Favorites");
                  }}
                >
                  <Ionicons name="star" size={25} color="#506475" />
                </Pressable>
              ),
            })}
          />
          <Stack.Screen
            name="Favorites"
            component={Favorites}
          />
          <Stack.Screen
            name="FullImg"
            component={FullImg}
            options={{title: "Image Details"}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  toast: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 50,
    backgroundColor: "#20252aca",
    marginBottom: "14%",
  },
  toastText: {
    color: "#fff",
    fontSize: 16,
  },
  headerText: {
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#4b595e'
  }
});
