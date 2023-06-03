import React from 'react'
import * as ImagePicker from 'expo-image-picker'

export default async function handleSelectImages(images: string|string[], setImages:(value: React.SetStateAction<string[]>) => void){
    const {status} = await ImagePicker.requestCameraPermissionsAsync()

    if(status != 'granted'){
      alert('Eita, precisamos de acesso a suas fotos')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (result.canceled){
      return
    }

    const {uri: image} = result.assets[0]

    setImages([...images, image])
  }