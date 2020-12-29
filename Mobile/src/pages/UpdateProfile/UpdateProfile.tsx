import React, { useState } from 'react'
import {Dimensions, Image, ImageBackground, Text, View } from 'react-native'
import styles from './styles'
import Waves from '../../images/waves.png'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import handleSelectImages from '../../utils/ImageUpload'
import api from '../../services/api'
import GetUser from '../../utils/GetUser'

export default function UpdateProfile(){

    const [description,setDescription] = useState('')
    const [specialty, setSpecialty] = useState('')
    const [image, setImage] = useState<string[]>([])
    const [whatsapp, setWhatsapp] = useState('')

    const navigation = useNavigation()

    function handleNavigateToProfile(){
        navigation.navigate('Profile')
    }

    async function handleUpdateProfile(){
        const data = new FormData()

        const user = await GetUser()

        if(description!='') data.append('description', description)
        if(specialty!='') data.append('specialty', specialty)
        if(whatsapp!='') data.append('whatsapp', whatsapp)
        
        image.forEach((image, index)=>{
            data.append('image',{
                name:`image_${index}.jpg`,
                type:'image/jpg',
                uri:image,

            } as any )
        })

        console.log("dados:", data)

        await api.put(`/profile/update/${user.id}/`, data).then((response) =>{
            console.log(response)
        }).catch(err =>console.log(err))

        handleNavigateToProfile()

       
    }

    return(
        <View style={styles.container}>

            <View style={{height:220, alignItems: 'center'}}>
                <ImageBackground style={styles.waves} source={Waves}>
                    <Header title="Preencha e atualize seus dados" />
                </ImageBackground>
            </View>

            <View style={styles.FormView}>

                <Input
                value={description}
                setData={setDescription} 
                name="Descrição" 
                options={{
                    customStyle:{height:115,alignItems:'flex-start'},
                    useAsTextArea: true,
                    TextInputStyle: {
                        height:115,
                        alignSelf: 'flex-start',
                    }
                }} 
                />

                <Input 
                value={specialty}
                setData={setSpecialty}
                name="Especialidade"
                />


                {image.length==0 && (
                    <RectButton 
                    onPress={()=> handleSelectImages(image,setImage)}
                    style={styles.UploadButton}>
                        <Feather name="plus" size={24} color='#FFF'/>
                    </RectButton>
                )}
                {image.map(image => (
                    <>
                    <Text style={styles.formText} >Foto:</Text>
                    <Image style={styles.Imagebackground} source={{uri: image}}/>
                    </>
                ))}

                <Input 
                value={whatsapp}
                setData={setWhatsapp}
                name="Whatsapp"
                />

                <RectButton
                onPress={handleUpdateProfile} 
                style={styles.SubmitButton}
                >
                    <Text style={styles.SubmitButtonText}>
                        Finalizar 
                    </Text>
                </RectButton>
            </View>
        </View>
    )
}