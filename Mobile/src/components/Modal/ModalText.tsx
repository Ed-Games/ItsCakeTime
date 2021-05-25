import React from 'react'
import {Text} from 'react-native'
import styles from './ModalViewStyles'

interface TextProps{
    children:string,
    style?: object
}

export function ModalText(props: TextProps){
    const style = {
        ...styles.ModalText,
        ...props.style,
    }

    console.log(style)
    return(
        <Text style={style}>
            {props.children}
        </Text>
    )
}