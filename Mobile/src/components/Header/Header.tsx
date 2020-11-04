import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'

interface Headerprops {
    title?: String,
    image?: String
}

export default function Header(props:Headerprops) {

    const navigation = useNavigation()

    function handleNavigateToPreviousPage(){
        navigation.goBack()
    }

    return(
        <View style={styles.FlexRowView}>
            <RectButton onPress={handleNavigateToPreviousPage} style={styles.iconButton}>
                <Feather  name="arrow-left" size={24} color='#FFF' />
            </RectButton>
            {props.title && <Text style={styles.title}>{props.title}</Text> }
            {props.image && 
                <Image style={styles.Avatar} source={props.image} />
            }
            <RectButton>
                <Feather  style={styles.iconButton} name="menu" size={24} color='#FFF' />
            </RectButton>
        </View>
    )
}