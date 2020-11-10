import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'

interface Headerprops {
    title?: String,
}

export default function Header(props:Headerprops) {

    const navigation = useNavigation()

    function handleNavigateToPreviousPage(){
        navigation.goBack()
    }

    return(
        <View style={styles.headerView}>
            <RectButton onPress={handleNavigateToPreviousPage} style={{alignSelf:'flex-start'}}>
                <Feather styles={styles.iconButton} name="arrow-left" size={24} color='#FFF'/>
            </RectButton>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}