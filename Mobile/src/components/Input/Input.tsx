import React from 'react'
import { Text, TextInput, View } from 'react-native'
import styles from './styles'

interface InputProps{
    name: string,
    placeholder: string
}

export default function Input(props: InputProps){
    return(
        <>
            <Text style={styles.InputText}>{props.name}</Text>
                <View style={styles.FormInputView}>
                    <TextInput style={styles.Input} placeholder={props.placeholder}>
                    </TextInput>
                </View>
        </>
    )
}