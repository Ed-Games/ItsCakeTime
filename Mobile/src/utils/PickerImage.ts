import {Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export async function ImageUpload(handleChange: (value: string)=>void){

    if(Platform.OS !=='web'){
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if(status != "granted"){
            alert('Desculpe. precisamos de acesso a sua galeria para que isso funcione.')
        }
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality:1
    })

    console.log(result)

    !result.cancelled && handleChange(result.uri)
    
}
