import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'

export default function EmailButton() {
    return(
        <RectButton onPress={()=>console.log("email")} style={styles.EmailButton}>
            <View style={styles.FlexRowView}>
                <Feather name="mail" size={24} color='#FFF' style={{marginLeft: 5, marginTop: 5}} />
                <Text style={styles.ButtonText}>Enviar um Email</Text>
            </View>
        </RectButton>
    )
}