import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useState } from "react";
import api from '../services/api';

type User = {
    userName: string,
    accessToken: string,
    id: number,
    email:string
}

interface UserContextProps{
    loggedUser: User,
    profileData: Profile| undefined,
    LoadProfileDataFromAPI: ()=> Promise<Profile>,
    LoadUserDataFromStorage: () => void,
    SaveUserDataToStorage: (user:User) => Promise<Boolean>,
    ClearUserDataFromStorage: () => void
}

interface UserContextProviderProps{
    children: ReactNode
}

export const UserContext = createContext({} as UserContextProps);


export const UserContextProvider = ({children}:UserContextProviderProps) => {
    const [loggedUser, setLoggedUser] = useState<User>({} as User)
    const [profileData, setProfileData] = useState<Profile>()

    async function LoadProfileDataFromAPI(){
        try {
            if(loggedUser.id){
                const response = await api.get('/profile/show')
                setProfileData(response.data.profile)
                return await response.data.profile
            }
        } catch (error) {
            setProfileData(undefined)
            ClearUserDataFromStorage()
        }
    }

    async function LoadUserDataFromStorage(){
        const userData = await AsyncStorage.getItem('user')
        if(userData){
            setLoggedUser(JSON.parse(userData))
        } 
    }

    async function SaveUserDataToStorage(user: User){
        await AsyncStorage.setItem('user', JSON.stringify(user)).catch(error => {return false})
        setLoggedUser(user)
        return true
    }

    async function ClearUserDataFromStorage(){
        await AsyncStorage.removeItem('user')
        setLoggedUser({} as User)
        setProfileData(undefined)
    }

    return(
        <UserContext.Provider value={{
        loggedUser,
        LoadProfileDataFromAPI,
        LoadUserDataFromStorage,
        SaveUserDataToStorage,
        ClearUserDataFromStorage,
        profileData
        }}>
        {children}
        </UserContext.Provider>
    )
    
}


export const useUser = () => {
    return useContext(UserContext)
}
