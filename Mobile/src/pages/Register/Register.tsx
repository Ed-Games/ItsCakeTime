import React from 'react'
import { Image, ImageBackground, Text, View, Dimensions } from 'react-native'
import Waves from '../../images/waves.png'
import styles from './styles'
import Header from '../../components/Header/Header'
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import Input from '../../components/Input/Input'
import { useNavigation } from '@react-navigation/native'

export default function Register(){

    const navigation = useNavigation()
    
    function handleNavigateToLogin(){
        navigation.navigate('Login')
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
                    <Input name="Nome: " placeholder="Seu Nome de usuário" />
                    <Input name="E-mail: " placeholder="Informe seu e-mail" />
                    <Input name="Senha: " placeholder="Informe uma boa senha" />
                    <Input name="Confirmar senha: " placeholder="Repita a senha anterior " />
                    <Input name="Whatsapp: " placeholder="Seu numero de whatsapp" />
                    <RectButton onPress={handleNavigateToLogin} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Finalizar Cadastro</Text>
                    </RectButton>
                    
                   </ScrollView>
                </View>
            </View>
            
        </View>
    )
}