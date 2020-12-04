import { useNavigation } from '@react-navigation/native'
import React from 'react'

export default function NavigationService(url:string){
    const navigation = useNavigation()
    navigation.navigate(url)
}