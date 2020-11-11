import { Feather } from '@expo/vector-icons'
import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer'
import React from 'react'
import { Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'

interface ButtonLinkProps{
    drawerProps: DrawerContentComponentProps<DrawerContentOptions>,
    title: String,
    navigateTO: string,
    icon: string
}

export default function ButtonLink(props: ButtonLinkProps){

    function handleNavigateToLandingPage(){
        props.drawerProps.navigation.navigate(props.navigateTO)
    }
    return(
        <>
            <RectButton onPress={handleNavigateToLandingPage} style={styles.ButtonLink}>
                <Feather name={props.icon} size={24} color='#9553A0'/>    
                <Text style={styles.LinkText}>{props.title}</Text>
            </RectButton>
            <View style={styles.LineSpace}>
            </View>
        </>
    )
}