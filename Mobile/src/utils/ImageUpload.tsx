import React from 'react'
import * as ImagePicker from 'expo-image-picker'

export default async function handleSelectImages(images: string[], setImages:(value: React.SetStateAction<string[]>) => void){
    const {status} = await ImagePicker.requestCameraRollPermissionsAsync()

    if(status != 'granted'){
      alert('Eita, precisamos de acesso a suas fotos')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (result.cancelled){
      return
    }

    const {uri: image} = result

    setImages([...images, image])
  }