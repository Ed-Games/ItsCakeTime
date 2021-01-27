import React from 'react'
import {Text, TextInput, View } from 'react-native'
import styles from './styles'

interface InputProps{
    name: string,
    placeholder?: string,
    options?: {
        titleMode?: string,
        customStyle?: object,
        useAsTextArea?: boolean,
        TextInputStyle?: object
    },

    defaultValue?: string,
    secureTextEntry?: boolean,
    value?:string,
    setData?:  React.Dispatch<React.SetStateAction<string>>,
    captalize?: any
}


export default function Input(props: InputProps){
    return(
        <>
            {props.options?.titleMode =='Light'? 
            (
                <Text style={[styles.InputText,{color:"#FFF"}]}>{props.name}</Text>
            ):(
                <Text style={styles.InputText}>{props.name}</Text>
            )}
                <View style={[styles.FormInputView,props.options?.customStyle]}>
                    <TextInput autoCapitalize={props.captalize} 
                    secureTextEntry={props.secureTextEntry}
                    onChangeText={props.setData} 
                    value={props.value} 
                    defaultValue={props?.defaultValue} 
                    multiline={props.options?.useAsTextArea} 
                    style={[styles.Input,props.options?.TextInputStyle]} 
                    placeholder={props.placeholder}>
                    </TextInput>
                </View>
        </>
    )
}
