import React from 'react'
import {Dimensions, ImageBackground, Text, View } from 'react-native'
import styles from './styles'
import Waves from '../../images/waves.png'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export default function UpdateProfile(){

    const navigation = useNavigation()

    function handleNavigateToProfile(){
        navigation.navigate('Profile')
    }

    return(
        <View style={styles.container}>

            <View style={{height:220, alignItems: 'center'}}>
                <ImageBackground style={styles.waves} source={Waves}>
                    <Header title="Preencha e atualize seus dados" />
                </ImageBackground>
            </View>

            <View style={styles.FormView}>

                <Input 
                name="Descrição" 
                options={{
                    customStyle:{height:115,alignItems:'flex-start'},
                    useAsTextArea: true,
                    TextInputStyle: {
                        height:115,
                        alignSelf: 'flex-start',
                    }
                }} 
                />

                <Input 
                name="Especialidade"
                />


                <Input 
                name="Foto" 
                options={{
                    customStyle:{borderRadius:20}
                }} 
                />

                <Input 
                name="Whatsapp"
                />

                <RectButton
                onPress={handleNavigateToProfile} 
                style={styles.SubmitButton}
                >
                    <Text style={styles.SubmitButtonText}>
                        Finalizar 
                    </Text>
                </RectButton>
            </View>
        </View>
    )
}