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
import { Formik } from 'formik'
import * as yup from 'yup'
import { Button } from 'react-native-paper'
import { loginValidationSchema } from '../../Schema/loginSchema'

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
       // if(exists)console.log("sera que tem um user?", JSON.parse(exists))
    }


    async function SignIn(values:{user:string, password:string}){
        const credentials = {
            userName: values.user.trim(),
            password: values.password.trim(),
        }
        
        Keyboard.dismiss()

        try {
            await api.post('login',credentials).then(response =>{
                //console.log(response.data)
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

    async function requestPassword(){
        const data = {
            "email": email
        }
        const response= await api.post('requestNewPassword',data).then(response =>{
            console.log(data)
            console.log(response.data)
        }).catch(err => console.log(err))
        navigation.navigate('ResetPasswd')
        setEmail('')
    }

    
    useEffect(() => {
        setuser('')
        setPasswd('')
        setLoginModalVisible(false)
        setForgotPasswdModalVisible(false)
    },[])


    useEffect(() => {
        if(email && email!='' && forgotPasswdmodalVisible==false){

            requestPassword()
        }
    },[forgotPasswdmodalVisible])

    return(
        <>
        <KeyboardAvoidingView  behavior='position' style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <Header title="Faça Login para continuar" />
                <Image style={styles.Image} source={LoginBaker} />
                
                <Formik
                    initialValues={{user:'', password:'',}}
                    validationSchema={loginValidationSchema}
                    onSubmit={values => SignIn(values)}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        isValid
                    }) => (
                        <>
                                <Input
                                captalize='none' 
                                value={values.user}
                                setData={handleChange('user')}
                                name="Usuário :" 
                                placeholder="Seu nome de usuário" 
                                options={{
                                    titleMode: 'Light'
                                }} 
                                />

                                {errors.user &&
                                        <Text style={{ fontSize: 15, color: 'yellow', marginBottom:10 }}>{errors.user}</Text>
                                }
                                <Input 
                                captalize='none'
                                value={values.password}
                                setData={handleChange('password')}
                                name="Senha :" 
                                secureTextEntry={true}
                                placeholder="Informe sua senha" 
                                options={{
                                    titleMode: 'Light',
                                }} 
                                />
                                {errors.password &&
                                    <Text style={{ fontSize: 15, color: 'yellow', marginBottom:10 }}>{errors.password}</Text>
                                }

                                <RectButton onPress={()=> setForgotPasswdModalVisible(true)} style={{alignSelf: 'flex-end', marginRight:60}}>
                                    <Text style={styles.passwordText}>Esqueci minha senha</Text>
                                </RectButton>
                                <Button onPress={handleSubmit} style={styles.submitButton}>
                                    <Text style={styles.submitButtonText}>Entrar</Text>
                                </Button>
                                <RectButton style={{marginTop:28, flexDirection: 'row'}} onPress={handleNavigateToRegister}>
                                    <Text style={styles.GoToRegisterText}>Não possui uma Conta? </Text><Text style={styles.GoToRegisterTextLink}>Clique aqui</Text>
                                </RectButton>
                        </>
                    )}
                </Formik>

                
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
