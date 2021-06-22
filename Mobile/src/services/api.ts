import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { Alert } from 'react-native'
import {Navigate} from './RootNavigation'

async function GetUserData(){
    const userData = await AsyncStorage.getItem('@Key:user')
    if(userData) return JSON.parse(userData)
}

const api = axios.create({
    baseURL: 'http://10.0.0.105:3333',
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.response.use(
    response => {
        return response
    },

    error => {

        console.log(error.message)

        if(error.message == 'Network Error'){
            Alert.alert('Aviso', 
            'Desculpe, houve uma falha na conexão. Tente novamente mais tarde',
            [{text: 'Ok'}],
            {cancelable:false}
            )
            
        }

        if(error.response.status===401|| error.response.status===403){
            const requestConfig = error.config
            Navigate('Login',{})
        
            return axios(requestConfig)
        }

        return Promise.reject(error)
    },
          

)

api.interceptors.request.use(
    config => {
        return GetUserData().then(user =>{
            if(user && user.accessToken)
                config.headers.authorization = `Bearer ${user.accessToken}` 
            return Promise.resolve(config)

        }).catch(err =>{
            console.log(err)

            return Promise.resolve(config)
        } )
    },

    error => {
        return Promise.reject(error)
    }
)


export default api