import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import bakerImage from '../../images/baker.png'
import Logo from '../../images/logo.png'
import styles from './styles'


export default function Landing(){
    const navigation = useNavigation()

    function handleNavigateToProductsList(){
        navigation.navigate('ProductList')
    }

    function handleNavigateToLogin(){
        navigation.navigate('Login')
    }

    return(
        <View style={styles.container} >
            <Text style={styles.title} >Seja bem vindo ao</Text>
            <Image style={styles.logo} source={Logo} />
            <Image source={bakerImage}  />
            <Text style={styles.contentText}>Ter uma padaria por perto é bom, mas agora ela esta no seu bolso</Text>
            <Text style={styles.actionText}>O que deseja fazer?</Text>
            <View style={styles.buttonsView}>
                <RectButton onPress={handleNavigateToProductsList} style={styles.clientButton}><Text style={styles.ButtonText}>Fazer uma encomenda</Text></RectButton>
                <RectButton onPress={handleNavigateToLogin} style={styles.bakerButton}><Text style={styles.ButtonText}>Ver minha confeitaria</Text></RectButton>
            </View>
        </View>
    )
}