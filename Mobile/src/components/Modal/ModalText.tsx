import React from 'react'
import {Text} from 'react-native'
import styles from './ModalViewStyles'

interface TextProps{
    children:string
}

export function ModalText(props: TextProps){
    return(
        <Text style={styles.ModalText}>
            {props.children}
        </Text>
    )
}