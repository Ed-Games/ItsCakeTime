import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Linking, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'

interface WhatsappProps{
    number: string|undefined
}

export default function WhatsappButton(props:WhatsappProps) {

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${props.number}`)
    }

    return(
        <RectButton onPress={sendWhatsapp} style={styles.WhatsappButton}>
            <View style={styles.FlexRowView}>
                <FontAwesome name="whatsapp" size={24} color='#FFF' style={{marginLeft: 5, marginTop: 5}} />
                <Text style={styles.ButtonText}>Whatsapp</Text>
            </View>
        </RectButton>
    )
}