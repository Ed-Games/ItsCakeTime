import axios from 'axios'
import GetUser from '../utils/GetUser'


const api = axios.create({
    baseURL: 'http://10.0.0.103:3333'
})

api.interceptors.request.use(
    config => {
        return GetUser().then(user => {
            if(user){
                const userData = JSON.parse(user);
                if(userData || userData.accessToken){
                    config.headers.authorization = `Bearer ${userData.accessToken}`
                    return Promise.resolve(config)
                }
            }
        }).catch(error => {
            console.log(error)
            return Promise.resolve(config)
          })
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default api