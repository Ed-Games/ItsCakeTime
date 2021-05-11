import React from 'react'
import AsyncStorage from "@react-native-community/async-storage";
import { createContext, ReactNode, useContext, useState } from "react";

type User = {
    userName: string,
    accessToken: string,
    id: number,
    email:string
}

interface UserContextProps{
    loggedUser: User,
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
    }

    return(
        <UserContext.Provider value={{
        loggedUser,
        LoadUserDataFromStorage,
        SaveUserDataToStorage,
        ClearUserDataFromStorage
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