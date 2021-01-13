import React from 'react'
import { Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import {Modal}from 'react-native-paper'

import styles from './styles'

interface ModalProps{
    modalVisible: boolean,
    setModalVisible:(value: React.SetStateAction<boolean>) => void, 
    title:string, 
    contentText: string,
    actionText: string,
}

export default function ModalView(props:ModalProps){
    return(
        <Modal
            visible={props.modalVisible}
        >
            <View style={styles.ModalView} >
                <Text style={styles.ModalTitleText}>{props.title}</Text>
                <Text style={styles.ModalText}>{props.contentText}</Text>
                <RectButton style={styles.ModalButton} onPress={()=>props.setModalVisible(false)} ><Text style={styles.ModalButtonText} >{props.actionText}</Text></RectButton>
            </View>
        </Modal>
    )
}