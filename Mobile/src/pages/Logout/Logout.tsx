import React from 'react'
import { Image, StatusBar, Text, View } from 'react-native'
import Header from '../../components/Header/Header'
import styles from './styles'
import Question from '../../images/Question.png'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export default function Logout(){

    const navigation = useNavigation()
    
    function handleNavigateToPreviousPage(){
        navigation.goBack()
    }

    function handleNavigateToLandingPage(){
        navigation.navigate('Landing')
    }

    return(
        <View style={styles.container}>
            <Header color="#9553A0" title="Deseja realmente sair?" />
            <View style={styles.imageView}>
                <Image source={Question} />
            </View>
            <View style={{flexDirection: 'row'}}>
                <RectButton onPress={handleNavigateToLandingPage} style={[styles.confirmButton, {backgroundColor: '#9553A0'}]}>
                    <Text style={styles.confirmButtonText}>Sim</Text>
                </RectButton>
                <RectButton onPress={handleNavigateToPreviousPage} style={[styles.confirmButton, {backgroundColor: '#F783EC'}]}>
                    <Text style={styles.confirmButtonText}>Não</Text>
                </RectButton>
            </View>
        </View>
    )
}