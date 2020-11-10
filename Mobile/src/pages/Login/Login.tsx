import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Header from '../../components/Header/Header'
import styles from './styles'
import LoginBaker from '../../images/LoginBaker.png'
import Input from '../../components/Input/Input'


export default function Login(){
    const navigation = useNavigation()
    function handleNavigateToRegister(){
        navigation.navigate('Register')
    }

    function handleNavigateToProfile(){
        navigation.navigate('Profile')
    }

    return(
        <View style={styles.container}>
            <Header title="Faça Login para continuar" />
            <Image style={styles.Image} source={LoginBaker} />
            <Input name="Usuário :" placeholder="Seu nome de usuário" titleMode="Light" />
            <Input name="Senha :" placeholder="Informe sua senha" titleMode='Light' />
            <RectButton style={{alignSelf: 'flex-end', marginRight:60}}>
                <Text style={styles.passwordText}>Esqueci minha senha</Text>
            </RectButton>
            <RectButton onPress={handleNavigateToProfile} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Entrar</Text>
            </RectButton>
            <RectButton style={{marginTop:28, flexDirection: 'row'}} onPress={handleNavigateToRegister}>
                <Text style={styles.GoToRegisterText}>Não possui uma Conta? </Text><Text style={styles.GoToRegisterTextLink}>Clique aqui</Text>
            </RectButton>

        </View>
    )
}
