import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import Header from '../../components/Header/Header'

import styles from './styles'
import Waves from '../../images/waves.png'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import ProductItem from '../../components/ProductItem/ProductItem'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function ViewYourProducts(){

    const navigation = useNavigation()

    function handleNavigationToRegisterProducts(){
        navigation.navigate('ProductRegister')
    }

    return(
        <View style={styles.container}>
            <View style={{height:210}}>
                <ImageBackground style={styles.Waves} source={Waves}>
                    <Header title="Editar seus produtos" />
                </ImageBackground>
            </View>
            <View style={styles.ProductsList}>
                <ScrollView  contentContainerStyle={{
                    alignItems: 'center',
                    paddingTop: 40,
                    paddingBottom:180,
                    marginTop: -60
                }}>
                    <ProductItem InfoButton={false} />
                    <ProductItem InfoButton={false} />
                    <ProductItem InfoButton={false} />
                    <ProductItem InfoButton={false} />
                    <ProductItem InfoButton={false} />

                </ScrollView>
                <RectButton onPress={handleNavigationToRegisterProducts} style={styles.plusButton}>
                    <Feather name="plus" size={24} color='#FFF'/>
                </RectButton>
            </View>
        </View>
    )
}