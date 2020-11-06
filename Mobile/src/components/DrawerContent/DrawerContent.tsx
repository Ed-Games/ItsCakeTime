import React from 'react'
import {Text,View} from 'react-native'
import {DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import ButtonLink from './ButtonLink'

export default function DrawerContent(props:DrawerContentComponentProps<DrawerContentOptions>){

    
    function handleNavigateToLandingPage(){
        props.navigation.navigate('Landing')
    }


    return(
        <View style={styles.container}>
            <View style={{marginTop:94, alignItems: 'center'}}>
                <ButtonLink title="Inicio" drawerProps={props} navigateTO='Landing' />
                <ButtonLink title="Lista de Produtos" drawerProps={props} navigateTO='ProductList' />
                <ButtonLink title="Pesquisar Padeiros" drawerProps={props} navigateTO='Search Profiles' />
            </View>
        </View>
    )
}