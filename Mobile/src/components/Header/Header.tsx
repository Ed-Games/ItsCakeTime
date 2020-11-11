import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'

interface Headerprops {
    title?: string,
    color?: string
}

export default function Header(props:Headerprops) {

    const navigation = useNavigation()

    function handleNavigateToPreviousPage(){
        navigation.goBack()
    }

    return(
        <View style={styles.headerView}>
            <RectButton onPress={handleNavigateToPreviousPage} style={{alignSelf:'flex-start'}}>
                {props.color? (
                    <Feather styles={styles.iconButton} name="arrow-left" size={24} color={props.color}/>
                ):(
                    <Feather styles={styles.iconButton} name="arrow-left" size={24} color='#FFF'/>
                )}
            </RectButton>
            {props.color?(
                <Text style={[styles.title, {
                    color: props.color
                }]}>{props.title}</Text>
            ):(
                <Text style={styles.title}>{props.title}</Text>
            )}
        </View>
    )
}