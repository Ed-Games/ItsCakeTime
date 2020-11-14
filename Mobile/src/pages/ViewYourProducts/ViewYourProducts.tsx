import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import Header from '../../components/Header/Header'

import styles from './styles'
import Waves from '../../images/waves.png'
import { ScrollView } from 'react-native-gesture-handler'
import ProductItem from '../../components/ProductItem/ProductItem'

export default function ViewYourProducts(){
    return(
        <View style={styles.container}>
            <View style={{height:210}}>
                <ImageBackground style={styles.Waves} source={Waves}>
                    <Header title="Editar seus produtos" />
                </ImageBackground>
            </View>
            <View style={styles.ProductsList}>
                <ScrollView contentContainerStyle={{
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
            </View>
        </View>
    )
}