import { useNavigation } from '@react-navigation/native'
import React, { ReactNode, useEffect, useState } from 'react'
import { View } from 'react-native'
import {Provider,Modal, Text, Portal, Button} from 'react-native-paper'
import styles from './ModalViewStyles'

interface ModalProps{
    children: ReactNode,
    isVisible: boolean,
    title: string,
    setStateFunction: (value: React.SetStateAction<boolean>) => void

}

export default function ModalView(props: ModalProps){
    return(
        <Provider>
            <Portal>
                <Modal visible={props.isVisible} onDismiss={()=>props.setStateFunction(false)} contentContainerStyle={styles.ModalView}>
                    <Text style={styles.ModalTitleText}>{props.title}</Text>
                    {props.children}
                </Modal>
            </Portal>
        </Provider>
    )
}