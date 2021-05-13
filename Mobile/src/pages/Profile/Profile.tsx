import React, { useEffect, useState } from 'react'
import {Image, ImageBackground, Text, View } from 'react-native'
import { RectButton} from 'react-native-gesture-handler'
import { Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import handleSelectImages from '../../utils/ImageUpload'


import api from '../../services/api'
import Biography from '../../components/BiographyContainer/Biography'
import Header from '../../components/Header/Header'

import Avatar from '../../images/avatar.png'
import Waves from '../../images/waves.png'
import styles from './style'
import { useUser } from '../../Contexts/UserContext'

interface DataProps extends Profile{
 imageUrl: string
}

interface ProfileProps{
    route : {
        name: string,
        params: {
            id:string
        },
    },
}

export default function Profile({route}: ProfileProps) {

    const navigation = useNavigation()
    const [images,setImages] = useState<string[]>([])
    const [data,setData] = useState<DataProps>()

    const {loggedUser, ClearUserDataFromStorage} = useUser()
  
    async function GetProfileData() {
        await api.get('/profile/show').then(response => {
            setData(response.data.profile)
            
        }).catch(err => {
            if(err.message=="Request failed with status code 401" || err.message=="Request failed with status code 403"){
                ClearUserDataFromStorage();
                navigation.navigate('Login')
            }
        })
    }

    async function GetSelectedProfileData(id:string){
        console.log('id: ', id)
        await api.get(`/profile/${id}`).then((response) =>{
            setData(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }
        
    async function handleImageUpload(){
        const imageData = new FormData()
        let id = loggedUser.id
        
        imageData.append('image',{
            type: 'image/jpg',
            uri: images[images.length - 1],
            name: 'profileImage',
        } as any)
        
        await api.put(`profile/update/${id}`, imageData).catch(err => console.log(err))
        
        setImages([])
        GetProfileData()
    }
    
    useEffect(()=>{
        navigation.addListener('focus',()=>{
            if(route.name =="Profile") GetProfileData()
        })
    }, [navigation])

    useEffect(()=>{
        if(route.name=="Details")  GetSelectedProfileData(route.params.id)
    },[route])

    return(
        <View style={styles.container}>
            <View>
                <Header backgroundColor="#9553A0"/>
                <ImageBackground style={styles.Waves} source={Waves}>
                    <View style={{flexDirection: 'row'}}>
                        {images.length>0?(
                            images.map((image,i,arr)=>{
                                if(arr.length -1 ===i){
                                    return(
                                        <>
                                            <Image key={image + 'image'} source={{uri: image}} style={styles.Avatar}/>
                                            <RectButton key={image + 'button'} onPress={handleImageUpload} style={styles.Savebutton}>
                                                <Text style={styles.SavebuttonText}>Salvar</Text>
                                            </RectButton>
                                        </>
                                    )
                                }
                            })
                        ):(
                            data?.image?(
                                <>
                                    <Image source={{uri: data.imageUrl}} style={styles.Avatar}/>
                                    {loggedUser.id == data.user_id && (
                                        <RectButton onPress={()=>handleSelectImages(images,setImages)} style={styles.EditButton}>
                                                <Feather name="camera" size={24} color="#FFF" />
                                        </RectButton>
                                    )}
                                </>
                            ):(
                                <>
                                    <Image source={Avatar} style={styles.Avatar}/>
                                    {loggedUser.id == data?.user_id && (
                                        <RectButton onPress={()=>handleSelectImages(images,setImages)} style={styles.EditButton}>
                                            <Feather name="camera" size={24} color="#FFF" />
                                        </RectButton>
                                    )}
                                </>
                            )
                        )}
                    </View>
                        <Text style={styles.Name}>{data?.userName}</Text>
                </ImageBackground>
            </View>
            <Biography data={data as DataProps} user={loggedUser.id} />
        </View>
    )
}