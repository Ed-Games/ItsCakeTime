import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Image, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useUser } from '../../Contexts/UserContext'
import bakerImage from '../../images/baker.png'
import Logo from '../../images/logo.png'
import styles from './styles'


export default function Landing(){
    const navigation = useNavigation()
    const {LoadUserDataFromStorage} = useUser()

    function handleNavigateToProductsList(){
        navigation.navigate('ProductList')
    }

    async function handleNavigateToNext(){
        const user = await AsyncStorage.getItem('@Key:user')
        navigation.navigate(user?'Profile':'Login')
    }

    useEffect(()=>{
        LoadUserDataFromStorage()
    },[])

    return(
        <View style={styles.container} >
            <Text style={styles.title} >Seja bem vindo ao</Text>
            <Image style={styles.logo} source={Logo} />
            <Image source={bakerImage}  />
            <Text style={styles.contentText}>Ter uma padaria por perto é bom, mas agora ela esta no seu bolso</Text>
            <Text style={styles.actionText}>O que deseja fazer?</Text>
            <View style={styles.buttonsView}>
                <RectButton onPress={handleNavigateToProductsList} style={styles.clientButton}><Text style={styles.ButtonText}>Fazer uma encomenda</Text></RectButton>
                <RectButton onPress={handleNavigateToNext} style={styles.bakerButton}><Text style={styles.ButtonText}>Ver minha confeitaria</Text></RectButton>
            </View>
        </View>
    )
}