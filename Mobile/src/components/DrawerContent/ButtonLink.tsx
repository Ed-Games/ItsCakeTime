import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer'
import React from 'react'
import { Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'

interface ButtonLinkProps{
    drawerProps: DrawerContentComponentProps<DrawerContentOptions>,
    title: String,
    navigateTO: string
}

export default function ButtonLink(props: ButtonLinkProps){

    function handleNavigateToLandingPage(){
        props.drawerProps.navigation.navigate(props.navigateTO)
    }
    return(
        <>
            <RectButton onPress={handleNavigateToLandingPage} style={styles.ButtonLink}>
                    <Text style={styles.LinkText}>{props.title}</Text>
            </RectButton>
            <View style={styles.LineSpace}>
            </View>
        </>
    )
}