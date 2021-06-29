import React, { useState } from 'react'
import { ImageBackground, Text, View, Dimensions, Alert, GestureResponderEvent, KeyboardAvoidingView, Platform } from 'react-native'
import Waves from '../../images/waves.png'
import styles from './styles'
import Header from '../../components/Header/Header'
import { RectButton, ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import Input from '../../components/Input/Input'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import ModalView from '../../components/Modal/ModalView'
import { Formik } from 'formik'
import { Registervalidation } from '../../Schema/RegisterSchema'
import { ModalText } from '../../components/Modal/ModalText'
import { ModalButton } from '../../components/Modal/ModalButton'

interface RegisterValues {
    name: string,
    email:string,
    password: string,
    whatsapp: string,
    confirmPassword: string
}

export default function Register(){
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')


    const navigation = useNavigation()
    

    async function createUser(values:RegisterValues){
        const data = {
            userName : values.name,
            email : values.email.trim(),
            password : values.password,
            whatsapp:values.whatsapp
        }

        console.log(data)

        await api.post('users/register', data).then(()=> {
            navigation.navigate('Login')
        }).catch(err => {
            console.log(err)
            setModalVisible(true)
            setMessage(`O e-mail ${data.email} ou nome ${data.userName} já estão em uso por outra pessoa!`)

        })        
        
    }

    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <View style={{height:230}}>
                <ImageBackground source={Waves} style={styles.waves}>
                    <Header title="Cadastre-se para começar a vender" />
                </ImageBackground>
            </View>
            <View>
                <View style={styles.FormView}>
                <Formik
                   initialValues={{name:'', email:'', password:'',confirmPassword:'', whatsapp:''}}
                   validationSchema={Registervalidation}
                   onSubmit={values => createUser(values)}
                   >
                       {({
                           handleChange,
                           handleSubmit,
                           errors,
                           handleReset
                       })=>(
                            <ScrollView 
                            style={{width:Dimensions.get('screen').width}}
                            contentContainerStyle={{alignItems: 'center',paddingBottom: 80}}
                            >
                            <Input 
                            setData={handleChange('name')} 
                            name="Nome: " 
                            placeholder="Seu Nome de usuário" 
                            />

                            {errors.name &&
                                <Text style={{ fontSize: 15, color: 'red', marginBottom:5 }}>{errors.name}</Text>
                            }
        
                            <Input 
                            setData={handleChange('email')} 
                            name="E-mail: "
                            placeholder="Informe seu e-mail" 
                            captalize='none'
                            />

                            {errors.email &&
                                <Text style={{ fontSize: 15, color: 'red', marginBottom:5 }}>O email deve ser válido</Text>
                            }
        
                            <Input 
                            setData={handleChange('password')} 
                            name="Senha: " 
                            placeholder="Informe uma boa senha"
                            secureTextEntry={true} 
                            />

                            {errors.password &&
                                <Text style={{ fontSize: 15, color: 'red', marginBottom:5 }}>{errors.password}</Text>
                            }
        
                            <Input 
                            setData={handleChange('confirmPassword')} 
                            name="Confirmar senha: " 
                            placeholder="Repita a senha anterior " 
                            secureTextEntry={true} 
                            />

                            {errors.confirmPassword &&
                                <Text style={{ fontSize: 15, color: 'red', marginBottom:5 }}>{errors.confirmPassword}</Text>
                            }
        
                            <Input 
                            setData={handleChange('whatsapp')} 
                            name="Whatsapp: " 
                            placeholder="Nº de whatsapp (com DDD)" 
                            />
                            {errors.whatsapp &&
                                <Text style={{ fontSize: 15, color: 'red', marginBottom:5 }}>{errors.whatsapp}</Text>
                            }
                            
                            <TouchableOpacity 
                            onPressIn={handleSubmit as unknown as (event: GestureResponderEvent) => void}
                            onPress={!errors?handleReset as unknown as (event: GestureResponderEvent) => void: ()=>{}} 
                            style={styles.submitButton}
                            >
                                <Text style={styles.submitButtonText}>Finalizar Cadastro</Text>
                            </TouchableOpacity>
                            
                            </ScrollView>
                       )}
                   </Formik>
                </View>
            </View>
            <ModalView 
            title="Erro!" 
            isVisible={modalVisible}
            setStateFunction={setModalVisible}
            >
                <ModalText>
                    {message}
                </ModalText>
                <ModalButton onPress={()=> setModalVisible(false)}>
                    <ModalText style={{color:"#9553A0"}}>
                        ok
                    </ModalText>
                </ModalButton>
            </ModalView>
            
        </KeyboardAvoidingView>
    )
}