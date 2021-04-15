import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {GestureResponderEvent, Image,Keyboard,KeyboardAvoidingView,Platform,Text, View} from 'react-native'
import { RectButton, TouchableOpacity} from 'react-native-gesture-handler'
import Header from '../../components/Header/Header'
import styles from './styles'
import LoginBaker from '../../images/LoginBaker.png'
import Input from '../../components/Input/Input'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import ModalView from '../../components/Modal/ModalView'
import { Formik} from 'formik'
import { loginValidationSchema } from '../../Schema/loginSchema'
import { EmailSchema } from '../../Schema/EmailSchema'
import { ModalText } from '../../components/Modal/ModalText'
import { ModalButton } from '../../components/Modal/ModalButton'

export default function Login(){

    const navigation = useNavigation()

    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [forgotPasswdmodalVisible, setForgotPasswdModalVisible] = useState(false);
    const [email, setEmail] = useState('')
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);


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
                return
            } else{
                console.log(err)
            }
        }

    }

    async function requestPassword(email:string){
        setForgotPasswdModalVisible(false)
        console.log("email: ",email)
        const data = {
            "email": email
        }
        console.log(data)
        const response= await api.post('requestNewPassword',data).then(response =>{
            console.log(response.data)
        }).catch(err => console.log(err))
        navigation.navigate('ResetPasswd')
        setEmail('')
    }

    
    useEffect(() => {
        setLoginModalVisible(false)
        setForgotPasswdModalVisible(false)
    },[])

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardOpen(true)
        })
        Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardOpen(false)
        })
    },[Keyboard])


    return(
        <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <Header title="Faça Login para continuar" />
                {!isKeyboardOpen && (
                    <Image style={styles.Image} source={LoginBaker} />
                )}
                
                <Formik
                    initialValues={{user:'', password:'',}}
                    validationSchema={loginValidationSchema}
                    onSubmit={values => SignIn(values)}
                >
                    {({
                        handleChange,
                        handleSubmit,
                        values,
                        errors,
                        handleReset
                    }) => (
                        <>
                                <Input
                                captalize='none' 
                                value={values.user}
                                setData={handleChange('user')}
                                name="Usuário :" 
                                placeholder="Seu nome de usuário" 
                                options={{
                                    titleMode: 'Light',
                                    customStyle:{marginBottom:5}
                                }} 
                                />

                                {errors.user &&
                                        <Text style={{ fontSize: 15, color: 'yellow', marginBottom:5 }}>{errors.user}</Text>
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
                                    customStyle: {marginBottom:5}
                                }} 
                                />
                                {errors.password &&
                                    <Text style={{ fontSize: 15, color: 'yellow', marginBottom:5 }}>{errors.password}</Text>
                                }

                                <TouchableOpacity 
                                onPressIn={handleSubmit as unknown as (event: GestureResponderEvent) => void}
                                onPress={handleReset as unknown as (event: GestureResponderEvent) => void} 
                                style={styles.submitButton}
                                >
                                    <Text style={styles.submitButtonText}>Entrar</Text>
                                </TouchableOpacity>

                                <RectButton onPress={()=> setForgotPasswdModalVisible(true) } style={{marginTop: 10}} >
                                    <Text style={styles.passwordText}>Esqueci minha senha</Text>
                                </RectButton>

                                <RectButton style={{marginTop:10, flexDirection: 'row'}} onPress={handleNavigateToRegister}>
                                    <Text style={styles.GoToRegisterText}>Não possui uma Conta? </Text><Text style={styles.GoToRegisterTextLink}>Clique aqui</Text>
                                </RectButton>
                        </>
                    )}
                </Formik>

                
            </View>

            <ModalView title="Erro!" isVisible={loginModalVisible} setStateFunction={setLoginModalVisible} >
                <>
                    <ModalText>Verifique se o usuário e senha estão corretos e tente novamente</ModalText>
                    <ModalButton onPress={()=> setLoginModalVisible(false)}>
                        <ModalText>
                            Ok
                        </ModalText>
                    </ModalButton>
                </>
            </ModalView>

            <Formik
            initialValues={{email: ''}}
            validationSchema={EmailSchema}
            onSubmit={values => requestPassword(values.email.trim())}
            >
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    handleReset
                })=>(
                    <ModalView title="Esqueceu sua senha?" isVisible={forgotPasswdmodalVisible} setStateFunction={setForgotPasswdModalVisible} >
                        <>
                            <ModalText>
                                Sem problema, informe seu email para te ajudarmos a criar uma nova
                            </ModalText>
                            <View style={{marginTop:20, alignItems: 'center'}}>
                                <Input
                                captalize="none" 
                                name="Email: "
                                value={values.email}
                                setData={handleChange('email')}
                                />
                                {errors.email &&
                                    <Text style={{ fontSize: 15, color: 'red', marginBottom:10 }}>{errors.email}</Text>
                                        }
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                            <ModalButton onPress={handleSubmit as ()=>void}>
                                <ModalText>
                                    Enviar
                                </ModalText>
                            </ModalButton>
                            <ModalButton onPress={()=>setForgotPasswdModalVisible(false)}>
                                <ModalText>
                                    Cancelar
                                </ModalText>
                            </ModalButton>
                        </View>
                    </>
                    </ModalView>
                )}

            </Formik>

        </KeyboardAvoidingView>
    )
}
