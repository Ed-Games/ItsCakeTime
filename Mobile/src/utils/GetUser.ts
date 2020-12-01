import AsyncStorage from "@react-native-community/async-storage";

export default async function GetUser(){
    const user = AsyncStorage.getItem('@Key:user')
    if(user) return user
}
