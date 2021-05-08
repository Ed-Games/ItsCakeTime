import { Picker } from '@react-native-picker/picker'
import React from 'react'
import styles from '../../pages/EditProduct/styles'

interface PickerProps{
    value: number,
    setValue:  (value: React.SetStateAction<number | undefined>) => void,

}

export default function ReactPicker(props:PickerProps){
    return(
        <Picker 
            selectedValue={props.value} 
            onValueChange={value => props.setValue(value as number)} 
            style={[styles.CategoryInput,{
                fontFamily: 'Poppins_300Light'
            }]}>
            <Picker.Item label="Selecionar" value="0" />
                <Picker.Item label="Bolos" value="1" />
                <Picker.Item label="Tortas" value="2" />
                <Picker.Item label="Salgados" value="3" />
                <Picker.Item label="Biscoitos" value="4" />
                <Picker.Item label="Doces" value="5" />
                <Picker.Item label="Outros" value="6" />
        </Picker>
    )
}