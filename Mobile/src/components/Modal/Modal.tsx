import React from 'react'
import { Text, View } from 'react-native'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import {Modal}from 'react-native-paper'

import styles from './styles'

interface ModalProps{
    modalVisible: boolean,
    setModalVisible:(value: React.SetStateAction<boolean>) => void, 
    title:string, 
    contentText: string,
    actionText: string,
    ContentBlock?: JSX.Element,
    actionTextStyle?:object,
    onClose?: ()=>void;
    disabled?:boolean;
    
}

export default function ModalView(props:ModalProps){
    return(
        <Modal
            visible={props.modalVisible}
        >
            <View style={styles.ModalView} >
                <Text style={styles.ModalTitleText}>{props.title}</Text>
                <Text style={styles.ModalText}>{props.contentText}</Text>
                {props.ContentBlock && (
                    props.ContentBlock
                )}
                <TouchableOpacity 
                disabled={props.disabled}
                style={styles.ModalButton} 
                onPressIn={()=>props.setModalVisible(false)} 
                onPress={props.onClose}
                >
                    <Text style={[styles.ModalButtonText,props.actionTextStyle]} >{props.actionText}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}