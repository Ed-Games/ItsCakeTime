import axios from 'axios'
import { Alert } from 'react-native'
import GetUser from '../utils/GetUser'
import DeleteUser from '../utils/DeleteUser'
import NavigationService from './navigationService'


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
        if(error.request._hasError=== true && error.response.includes('connect')){
            Alert.alert('Aviso', 
            'Não foi possível conectar, sem internet',
            [{text: 'Ok'}],
            {cancelable:false}
            )
        }

        /*if(error.response.status===401|| error.response.status===403){
            const requestConfig = error.config

            DeleteUser().then(()=>{
                NavigationService('Login')
            })

            return axios(requestConfig)
        }*/

        return Promise.reject(error)
    },
          

)

api.interceptors.request.use(
    config => {
        return GetUser().then(user =>{
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