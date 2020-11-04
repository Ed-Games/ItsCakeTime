import React from 'react'
import { ImageBackground, Text, View } from 'react-native'

import styles from './styles'
import Waves from '../../images/waves.png'
import Header from '../../components/Header/Header'
import { RectButton, TextInput } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

export default function Search(){
    return(
        <View style={styles.container}>
            <View>
                <ImageBackground source={Waves} style={styles.Waves}>
                    <Header title="Padeiros Disponíveis: "/>
                    <View style={styles.search}>
                        <TextInput placeholder="Procure um confeiteiro pelo nome de perfil" />
                        <RectButton>
                            <Feather name="search" size={24} color='#FFF'/>
                        </RectButton>
                    </View>
                </ImageBackground>
            </View>
        </View>
    )
}

