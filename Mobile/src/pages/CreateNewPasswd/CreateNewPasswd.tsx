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
    email:string,
    token:string,
}

export default function CreateNewPasswd(){

    const [password,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword]= useState('')

    const navigation = useNavigation()

    const route = useRoute()
    const {email, token} = route.params as ParamsProps

    console.log("email: ",email,"token: ",token)

    function handleNavigateToProfile(){
        if(password == confirmPassword){
            handleResetPassword()
            navigation.navigate('Profile')
        } else{
            console.log('Precisam ser iguais')
        }

    }

    async function handleResetPassword(){
        await api.put(`users/resetPassword/${token}`, {email:email,password:password }).then(response => {
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