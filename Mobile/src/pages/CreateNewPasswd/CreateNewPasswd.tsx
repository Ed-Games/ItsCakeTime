import { useNavigation, useRoute } from '@react-navigation/native'
import { Formik } from 'formik'
import React, {useEffect, useState } from 'react'
import { Image, Text, View, Keyboard} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import Security from '../../images/Security.png'
import { passwordValidationSchema } from '../../Schema/passwordValidationSchema'
import api from '../../services/api'
import styles from './styles'

interface RouteParamsProps{
    params:{
        params:{
            email:string,
            token:string,
        }
    }
}

type Values = {
    password: string,
    confirmPassword: string
}

export default function CreateNewPasswd(){

    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

    const navigation = useNavigation()


    const route = useRoute() as RouteParamsProps

    console.log("testing: ", route.params?.params.token)

    function handleNavigateToProfile(values: Values){
        if(values.password == values.confirmPassword){
            handleResetPassword(values.password)
            navigation.navigate('Profile')
        } else{
            console.log('Precisam ser iguais')
        }

    }

    async function handleResetPassword(password: string){
        console.log(route)
        console.log("token: ", route.params.params.token, "email: ", route.params.params.email)
        await api.put(`users/resetPassword/${route.params.params.token}`, {email:route.params.params.email,password:password }).then(response => {
            return console.log(response.data)
        })
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardOpen(true)
        })
        Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardOpen(false)
        })
    },[Keyboard])

    return(
        <View style={styles.container}>
        <Header title="Digite uma nova senha segura" />
        {!isKeyboardOpen && (
            <Image style={styles.Image} source={Security} />
        )}

        <Formik
        initialValues={{password:'', confirmPassword:''}}
        onSubmit={values => handleNavigateToProfile(values)}
        validationSchema={passwordValidationSchema}
        >
            {({
                handleChange,
                handleSubmit,
                errors,
                values
            })=>(
                <>
                    <Input setData={handleChange('password')} 
                    name="Nova senha :" 
                    placeholder="Nova senha" 
                    captalize="none"
                    secureTextEntry={true}
                    options={{
                        titleMode:'Light'
                    }} />

                    {errors.password &&
                        <Text style={{ fontSize: 15, color: 'yellow', marginBottom:5 }}>{errors.password}</Text>
                    }

                    <Input setData={handleChange('confirmPassword')} 
                    name="Confirmar senha" 
                    placeholder="Confirme a nova senha" 
                    captalize="none"
                    secureTextEntry={true}
                    options={{
                        titleMode: 'Light'
                    }} />

                    {errors.confirmPassword &&
                        <Text style={{ fontSize: 15, color: 'yellow', marginBottom:5 }}>{errors.confirmPassword}</Text>
                    }

                    <RectButton onPress={handleSubmit as ()=> void} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Salvar</Text>
                    </RectButton>
                </>
            )}

        </Formik>

    </View>
    )
}