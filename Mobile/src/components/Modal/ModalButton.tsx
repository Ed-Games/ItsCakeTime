import React from 'react'
import { RectButton } from 'react-native-gesture-handler'
import styles from './ModalViewStyles'

interface ButtonProps{
    children: JSX.Element
    onPress?: ((pointerInside: boolean) => void) | undefined
}

export function ModalButton(props: ButtonProps){
    return(
        <RectButton onPress={props.onPress} style={styles.ModalButton}>
            {props.children}
        </RectButton>
    )
}