import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { set } from 'react-native-reanimated'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import Security from '../../images/Security.png'
import api from '../../services/api'
import styles from './styles'

interface ParamsProps{
    "initial": boolean,
    params: {
        "token": string,
        "email": string,
    },
    "screen" : string,
    "state": any
}

export default function CreateNewPasswd(){

    const [password,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword]= useState('')

    const navigation = useNavigation()

    const route = useRoute()
    const routeParams = route.params as ParamsProps
    const token = routeParams.params.token
    const email = routeParams.params.email
    console.log(token, email)

    function handleNavigateToProfile(){
        if(password == confirmPassword){
            handleResetPassword()
            navigation.navigate('Profile')
        }

    }

    async function handleResetPassword(){
        await api.put(`http://10.0.0.105:3333/users/resetPasswd/${token}`, {email,password }).then(response => {
            return console.log(response.data)
        })
    }

    return(
        <View style={styles.container}>
        <Header title="Digite uma nova senha segura" />
        <Image style={styles.Image} source={Security} />
        <Input setData={setPassword} name="Nova senha :" placeholder="Nova senha" options={{
            titleMode:'Light'
        }} />
        <Input setData={setConfirmPassword} name="Confirmar senha" placeholder="Confirme a nova senha" options={{
            titleMode: 'Light'
        }} />
        <RectButton onPress={handleNavigateToProfile} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Salvar</Text>
        </RectButton>

    </View>
    )
}