import { createContext, useContext } from "react";

export const ProfileContext = createContext({});

export const ProfileContextProvider = () => {
    
}

export const useProfile = () => {
    return useContext(ProfileContext)
}

/*
* Informações do usuário logado e do perfil. Pode usar 
até para manter o usuário logado no app, savando o permanecer logado
no AsyncStorage e disponibilizando ao Axios pelo Context
*/