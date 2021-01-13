import React, { useState } from 'react'
import { ImageBackground, Text, View, Dimensions, Alert } from 'react-native'
import Waves from '../../images/waves.png'
import styles from './styles'
import Header from '../../components/Header/Header'
import { RectButton, ScrollView} from 'react-native-gesture-handler'
import Input from '../../components/Input/Input'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function Register(){

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const[confirmPassword, setConfirmPassword] = useState<string>('')
    const [whatsapp,setWhatsapp] = useState<string>('')
    const info = [name,email,password, whatsapp]


    const navigation = useNavigation()
    

    async function createUser(){

        if(!name || !email || !password || !whatsapp){
            Alert.alert('Por favor, precisamos que você preencha todos os dados para criarmos a sua conta')
        } else if(password != confirmPassword){
            Alert.alert('senha e confirmar senha precisam ser iguais')
        } else {
            const data = {
                userName : name,
                email : email,
                password : password,
                whatsapp:whatsapp
            }
    
    
            await api.post('users/register', data).then(response => {
                console.log(response)
            }).catch(err => console.log(err))

            navigation.navigate('Login')
        }

        
    }

    return(
        <View style={styles.container}>
            <View style={{height:230}}>
                <ImageBackground source={Waves} style={styles.waves}>
                    <Header title="Cadastre-se para começar a vender" />
                </ImageBackground>
            </View>
            <View>
                <View style={styles.FormView}>
                   <ScrollView 
                   style={{
                       width:Dimensions.get('screen').width,
                       
                   }}

                   contentContainerStyle={{
                       alignItems: 'center',
                       paddingBottom: 80
                   }}
                   >
                    <Input setData={setName} name="Nome: " placeholder="Seu Nome de usuário" />
                    <Input setData={setEmail} name="E-mail: " placeholder="Informe seu e-mail" />
                    <Input setData={setPassword} name="Senha: " placeholder="Informe uma boa senha" />
                    <Input setData={setConfirmPassword} name="Confirmar senha: " placeholder="Repita a senha anterior " />
                    <Input setData={setWhatsapp} name="Whatsapp: " placeholder="Seu numero de whatsapp" />
                    <RectButton onPress={createUser} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Finalizar Cadastro</Text>
                    </RectButton>
                    
                   </ScrollView>
                </View>
            </View>
            
        </View>
    )
}