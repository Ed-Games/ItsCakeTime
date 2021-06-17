import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'

import avatar from '../../images/avatar.png'

import styles from './styles'
import Header from '../../components/Header/Header'
import api from '../../services/api'
import ProductItem from '../../components/ProductItem/ProductItem'
import { ScrollView } from 'react-native-gesture-handler'

interface RouteProps{
    route : {
        name:string,
        params:{
            id:string,
            image:string,
            name: string,
            imageUrl: string
        }
    }
}

export default function ViewProfileProducts({route}:RouteProps){
    const [products, setProducts] = useState<Product[]>()

    async function getProducts(id:string){
        await api.get(`profile/${id}/products`).then(response => {
            setProducts(response.data)
            console.log(products)
        })
    }
    
    useEffect(() => {
        getProducts(route.params.id)
    }, [route.params.id])

    return(
        <View style={styles.container}>
            <Header backgroundColor="#9553A0" />
            <View style={styles.header}>
                <Image source={route.params.image? {uri:route.params.imageUrl} : avatar} style={styles.avatar} />
                <Text style={styles.title}> Lista de produtos de {route.params.name}</Text>
            </View>
            <View style={styles.products}>
                <ScrollView contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom:180,
                }}>
                    {products?.map(product => {
                        return(
                            <ProductItem Data={product} EditButton={false} InfoButton={false} />
                        )
                    })}
                </ScrollView>
            </View>
            
        </View>
    )
}