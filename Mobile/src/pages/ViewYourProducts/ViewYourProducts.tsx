import React, { useEffect, useState } from 'react'
import { ImageBackground, Text, View } from 'react-native'
import Header from '../../components/Header/Header'

import styles from './styles'
import Waves from '../../images/waves.png'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import ProductItem from '../../components/ProductItem/ProductItem'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

/*export interface Data extends Product{
    whatsapp: string,
    email: string,
}*/

export default function ViewYourProducts(){

    const navigation = useNavigation()
    const [data,setData] = useState<Product[]>()

    function handleNavigationToRegisterProducts(){
        navigation.navigate('ProductRegister')
    }

    function GetProductListForLogedUser() {
        api.get('product/myproducts').then(response=>{
            setData(response.data)
        })
    }

    useEffect(()=>{
        const unsubricribed =navigation.addListener('focus',()=>{
            GetProductListForLogedUser()
            //console.log('Refreshing...')
        })
    }, [navigation])

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
                    {data?.map((product,i) => {
                        return (
                            <ProductItem key={product.name+product.id+i} Data={product} InfoButton={false} />
                        )
                    })}

                </ScrollView>
                <RectButton onPress={handleNavigationToRegisterProducts} style={styles.plusButton}>
                    <Feather name="plus" size={24} color='#FFF'/>
                </RectButton>
            </View>
        </View>
    )
}