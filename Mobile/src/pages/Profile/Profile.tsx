import React, { useEffect, useState } from 'react'
import {Image, ImageBackground, Text, View } from 'react-native'
import Waves from '../../images/waves.png'
import styles from './style'

import Avatar from '../../images/avatar.png'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { Feather} from '@expo/vector-icons'
import {useNavigation, useRoute } from '@react-navigation/native'
import ProductItem from '../../components/ProductItem/ProductItem'
import handleSelectImages from '../../utils/ImageUpload'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import GetUser from '../../utils/GetUser'
import Biography from '../../components/BiographyContainer/Biography'


interface ProfileProps extends Profile{
 imageUrl: string
}

interface RouteParamsProps{
    id: string
}

export default function Profile() {

    const navigation = useNavigation()
    const [images,setImages] = useState<string[]>([])
    const [data,setData] = useState<ProfileProps>()
    const [products,setProducts] = useState<Product[]>()
    const [user, SetUser] = useState({})

    const route = useRoute()
    
    async function GetProfileData() {
        await api.get('/profile/show').then(response => {
            console.log("getting data...")
            setData(response.data.profile)
            
        }).catch(err => {
            if(err.message=="Request failed with status code 401" || err.message=="Request failed with status code 403"){
                async()=> await AsyncStorage.removeItem('@Key:user');
                navigation.navigate('Login')
            }
        })
        //
    }
        
    async function handleImageUpload(){
        const imageData = new FormData()
        let id = null
        
        await GetUser().then((user) => {
            id = user.id
        })
        
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
            GetUser().then((user) => {
                SetUser(user.id)
            })
    
            console.log(user)
            GetProfileData()
        })
    }, [navigation])

    return(
        <View style={styles.container}>
            <View>
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
                                        <RectButton onPress={()=>handleSelectImages(images,setImages)} style={styles.EditButton}>
                                            <Feather name="camera" size={24} color="#FFF" />
                                        </RectButton>
                                    </>
                                ):(
                                    <>
                                        <Image source={Avatar} style={styles.Avatar}/>
                                        <RectButton onPress={()=>handleSelectImages(images,setImages)} style={styles.EditButton}>
                                            <Feather name="camera" size={24} color="#FFF" />
                                         </RectButton>
                                    </>
                                )
                            )}
                        </View>
                        <Text style={styles.Name}>{data?.userName}</Text>
                </ImageBackground>
            </View>
            {route.name == 'Profile'?(
                <Biography data={data as ProfileProps} user={user as number} />
            ):(
                <View style={styles.ProductsList}>
                <ScrollView contentContainerStyle={styles.ScrollView}>
                    {products?.map((product) => {
                        <ProductItem Data={product} InfoButton={false} />
                    })}
                </ScrollView>
            </View>
            )}
        </View>
    )
}