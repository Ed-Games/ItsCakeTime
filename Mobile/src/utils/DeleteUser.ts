import AsyncStorage from "@react-native-community/async-storage";

export default async function DeleteUser(){
    const user = AsyncStorage.removeItem('@Key:user')
    if(user) return user
}
