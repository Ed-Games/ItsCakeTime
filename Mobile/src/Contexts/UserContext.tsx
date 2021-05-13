import React from 'react'
import AsyncStorage from "@react-native-community/async-storage";
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
    profileData: Profile|null,
    LoadProfileDataFromAPI: ()=> void,
    LoadUserDataFromStorage: () => void,
    SaveUserDataToStorage: (user:User) => void,
    ClearUserDataFromStorage: () => void
}

interface UserContextProviderProps{
    children: ReactNode
}

export const UserContext = createContext({} as UserContextProps);


export const UserContextProvider = ({children}:UserContextProviderProps) => {
    const [loggedUser, setLoggedUser] = useState<User>({} as User)
    const [profileData, setProfileData] = useState<Profile|null>(null)

    async function LoadProfileDataFromAPI(){
        try {
            if(loggedUser.id){
                const response = await api.get('/profile/show')
                setProfileData(response.data.profile)
            } else {
                setProfileData(null)
            }
        } catch (error) {
            setProfileData(null)
            console.log(error.message)
        }
    }

    async function LoadUserDataFromStorage(){
        const userData = await AsyncStorage.getItem('@Key:user')
        if(userData){
            setLoggedUser(JSON.parse(userData))
        } 
    }

    async function SaveUserDataToStorage(user: User){
        await AsyncStorage.setItem('@Key:user', JSON.stringify(user))
        setLoggedUser(user)
    }

    async function ClearUserDataFromStorage(){
        await AsyncStorage.removeItem('@Key:user')
        setLoggedUser({} as User)
        setProfileData(null)
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

/*
* Informações do usuário logado e do perfil. Pode usar 
até para manter o usuário logado no app, savando o permanecer logado
no AsyncStorage e disponibilizando ao Axios pelo Context
*/