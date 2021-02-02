import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Archivo_600SemiBold,Archivo_700Bold, useFonts} from '@expo-google-fonts/archivo'
import {Poppins_700Bold,Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_500Medium_Italic, Poppins_300Light, Poppins_400Regular, Poppins_500Medium} from '@expo-google-fonts/poppins'
import Routes from './src/routes';
import AppLoading  from 'expo-app-loading';


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
  })

  if(!fontsLoaded){
    return(
      <AppLoading />
    )
  }
  return (
    <>
    <StatusBar style='dark'/>
    <Routes />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
