import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'

export default function WhatsappButton() {
    return(
        <RectButton onPress={() => console.log("funciona")} style={styles.WhatsappButton}>
            <View style={styles.FlexRowView}>
                <FontAwesome name="whatsapp" size={24} color='#FFF' style={{marginLeft: 5, marginTop: 5}} />
                <Text style={styles.ButtonText}>Whatsapp</Text>
            </View>
        </RectButton>
    )
}