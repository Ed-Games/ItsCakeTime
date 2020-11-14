import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import Security from '../../images/Security.png'
import styles from './styles'

export default function CreateNewPasswd(){

    const navigation = useNavigation()

    function handleNavigateToProfile(){
        navigation.navigate('Profile')
    }

    return(
        <View style={styles.container}>
        <Header title="Digite uma nova senha segura" />
        <Image style={styles.Image} source={Security} />
        <Input name="Nova senha :" placeholder="Nova senha" options={{
            titleMode:'Light'
        }} />
        <Input name="Confirmar senha" placeholder="Confirme a nova senha" options={{
            titleMode: 'Light'
        }} />
        <RectButton onPress={handleNavigateToProfile} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Salvar</Text>
        </RectButton>

    </View>
    )
}