import React, { useEffect } from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

import avatar from '../../images/avatar.png'

import styles from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function ViewProfileProducts(){

    const router = useRoute()
    const navigation = useNavigation()

    
    useEffect(() => {
        navigation.addListener('focus',()=>{
            console.log(router.params)
        })
    }, [navigation])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={avatar} style={styles.avatar} />
                <Text style={styles.title}> Lista de produtos de Fernanda</Text>
            </View>
            
        </View>
    )
}