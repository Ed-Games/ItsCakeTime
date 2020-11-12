import React from 'react'
import { Image, Text, View } from 'react-native'
import Header from '../../components/Header/Header'
import styles from './styles'
import Sending from '../../images/sending.png'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export default function ResetPasswd(){

    const navigation = useNavigation()
    
    function handleNavigateToLandingPage(){
        navigation.navigate('CreateNewPasswd')
    }

    return(
        <View style={styles.container}>
            <Header title="Quase lá..."  color="#9553A0"/>
            <View>
                <Image source={Sending} />
            </View>
            <Text style={styles.MessageText}>Em breve você receberá um e-mail para criar uma nova senha</Text>
            <RectButton onPress={handleNavigateToLandingPage} style={styles.ButtonGoBack}>
                <Text style={styles.ButtonGoBackText}>Voltar a tela inicial</Text>
            </RectButton>
        </View>
    )
}