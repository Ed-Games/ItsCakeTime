import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function DeleteUser(){
    const user = AsyncStorage.removeItem('@Key:user')
    if(user) return user
}
