import React from 'react'
import {Image, Text,View} from 'react-native'
import {DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import ButtonLink from './ButtonLink'
import { Feather } from '@expo/vector-icons'
import Avatar from '../../images/avatar.png'

export default function DrawerContent(props:DrawerContentComponentProps<DrawerContentOptions>){

    
    function handleNavigateToLogout(){
        props.navigation.navigate('Logout')
    }


    return(
        <View style={styles.container}>
            <View style={styles.ImageView}>
                <Image source={Avatar} style={styles.Avatar} />
                <Text style={styles.AvatarNameText}>Alice Andrade Campus</Text>
            </View>
            <View style={{marginTop:94, alignItems: 'center'}}>
                <View style={styles.LineSpace}></View>
                <ButtonLink icon="home" title="Inicio" drawerProps={props} navigateTO='Landing' />
                <ButtonLink icon="user" title="Seu Perfil" drawerProps={props} navigateTO='Profile' />
                <ButtonLink icon="shopping-cart" title="Lista de Produtos" drawerProps={props} navigateTO='ProductList' />
                <ButtonLink icon="search" title="Pesquisar Padeiros" drawerProps={props} navigateTO='Search Profiles' />
            </View>
            <View style={styles.BottomContainer}>
                <RectButton onPress={handleNavigateToLogout} style={styles.SignOutButton}>
                    <Feather name="log-out" size={24} color='#9553A0'/>
                    <Text style={styles.SignOutText}>sair</Text>
                </RectButton>
            </View>
        </View>
    )
}