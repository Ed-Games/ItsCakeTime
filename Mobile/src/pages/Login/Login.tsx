import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {Image,Keyboard,KeyboardAvoidingView,Text, View} from 'react-native'
import { RectButton} from 'react-native-gesture-handler'
import Header from '../../components/Header/Header'
import styles from './styles'
import LoginBaker from '../../images/LoginBaker.png'
import Input from '../../components/Input/Input'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import ModalView from '../../components/Modal/Modal'

export default function Login(){

    const navigation = useNavigation()


    const [user,setuser] = useState("")
    const [passwd, setPasswd] = useState("") 
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [forgotPasswdmodalVisible, setForgotPasswdModalVisible] = useState(false);
    const [email, setEmail] = useState('')


    function handleNavigateToRegister(){
        navigation.navigate('Register')
    }

    async function SaveUser(user:object){
        await AsyncStorage.setItem('@Key:user', JSON.stringify(user))
        const exists = await AsyncStorage.getItem('@Key:user')
        if(exists)console.log("sera que tem um user?", JSON.parse(exists))
    }


    async function SignIn(){
        const credentials = {
            userName: user,
            password: passwd
        }
        
        Keyboard.dismiss()

        try {
            await api.post('login',credentials).then(response =>{
                console.log(response.data)
                SaveUser(response.data)
            })
            navigation.navigate('Profile') 
            

        } catch (err) {
            console.log(err)
            if(err.response.status == 400){
                console.log(err.response.status)
                setLoginModalVisible(true)
                setuser('')
                setPasswd('')
                return
            } else{
                console.log(err)
            }
        }

    }

    
    useEffect(() => {
        setuser('')
        setPasswd('')
        setLoginModalVisible(false)
        setForgotPasswdModalVisible(false)
    },[])

    useEffect(() => {
        if(email && email!='' && forgotPasswdmodalVisible==false){

            api.post('requestNewPassword',{email:email}).then(response => {
                console.log(response.data)
            }).catch(err => console.log(err))
    
            navigation.navigate('ResetPasswd')
            setEmail('')
        }
    },[forgotPasswdmodalVisible])

    return(
        <>
        <KeyboardAvoidingView  behavior='position' style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <Header title="Faça Login para continuar" />
                <Image style={styles.Image} source={LoginBaker} />
                
                <Input
                captalize='none' 
                value={user}
                setData={setuser}
                name="Usuário :" 
                placeholder="Seu nome de usuário" 
                options={{
                    titleMode: 'Light'
                }} 
                />


                <Input 
                captalize='none'
                value={passwd}
                setData={setPasswd}
                name="Senha :" 
                secureTextEntry={true}
                placeholder="Informe sua senha" 
                options={{
                    titleMode: 'Light',
                }} 
                />

                <RectButton onPress={()=> setForgotPasswdModalVisible(true)} style={{alignSelf: 'flex-end', marginRight:60}}>
                    <Text style={styles.passwordText}>Esqueci minha senha</Text>
                </RectButton>
                <RectButton onPress={SignIn} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Entrar</Text>
                </RectButton>
                <RectButton style={{marginTop:28, flexDirection: 'row'}} onPress={handleNavigateToRegister}>
                    <Text style={styles.GoToRegisterText}>Não possui uma Conta? </Text><Text style={styles.GoToRegisterTextLink}>Clique aqui</Text>
                </RectButton>

                
            </View>

        </KeyboardAvoidingView>

        <ModalView 
        modalVisible={loginModalVisible} 
        setModalVisible={setLoginModalVisible} 
        title="Erro!" 
        contentText="Verifique se o usuario e senha estam corretos e tente novamente"
        actionText="Ok"
        actionTextStyle={{borderRadius: 50}}
        />

        <ModalView
        ContentBlock={
        <View style={{marginTop:20, alignItems: 'center'}}>
                <Input
                captalize="none" 
                name="Email: "
                setData={setEmail}
                options={{
                    customStyle: {
                        alignSelf: "center",
                        marginBottom: 0
                    }
                }}
                />
        </View>
        }
        modalVisible={forgotPasswdmodalVisible} 
        setModalVisible={setForgotPasswdModalVisible} 
        title="Esqueceu sua senha?" 
        contentText="Sem problema, informe seu email para te ajudarmos a criar uma nova"
        actionText="Enviar"
        actionTextStyle = {{width:60, borderRadius:0}}
        />
        </>
    )
}
