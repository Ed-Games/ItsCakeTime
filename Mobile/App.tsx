import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import {
  Archivo_600SemiBold,
  Archivo_700Bold,
  useFonts,
} from "@expo-google-fonts/archivo";
import {
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_500Medium_Italic,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import Routes from "./src/routes";
import { UserContextProvider } from "./src/Contexts/UserContext";
import { ProductContextProvider } from "./src/Contexts/ProductContext";
import * as SplashScreen from 'expo-splash-screen';
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_600SemiBold,
    Archivo_700Bold,
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_500Medium_Italic,
    Poppins_500Medium,
    Poppins_300Light,
    Poppins_400Regular,
  });

  const onLayoutRootView = useCallback(async()=>{
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="dark" />
      <UserContextProvider>
        <ProductContextProvider>
          <Routes />
        </ProductContextProvider>
      </UserContextProvider>
    </View>
  );
}
