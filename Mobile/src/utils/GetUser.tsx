import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function GetUser(){
    const exists = await AsyncStorage.getItem('user')
    if(exists) return JSON.parse(exists)
}
