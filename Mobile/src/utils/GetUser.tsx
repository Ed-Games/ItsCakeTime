import AsyncStorage from "@react-native-community/async-storage";

export default async function GetUser(){
    const exists = await AsyncStorage.getItem('@Key:user')
    if(exists) return JSON.parse(exists)
}
