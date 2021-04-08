import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, View } from 'react-native'
import Waves from '../../images/waves.png'
import styles from './style'

import Avatar from '../../images/avatar.png'
import WhatsappButton from '../../components/WhatsappButton/WhatsappButton'
import EmailButton from '../../components/EmailButton/EmailButton'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { Feather, FontAwesome } from '@expo/vector-icons'
import {useNavigation, useRoute } from '@react-navigation/native'
import ProductItem from '../../components/ProductItem/ProductItem'
import handleSelectImages from '../../utils/ImageUpload'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import GetUser from '../../utils/GetUser'

interface Data{
    description : string,
    id: number,
    image: string,
    specialty: string,
    user_id: number,
    whatsapp: string,
    imageUrl: string,
    email: string,
    userName:string,
}

interface RouteParamsProps{
    id: string
}

export default function Profile() {

    const navigation = useNavigation()
    const [images,setImages] = useState<string[]>([])
    const [data,setData] = useState<Data>()
    const [user, SetUser] = useState({})
    

    const route = useRoute()
    //const {id} = route.params as RouteParamsProps
    //console.log("ID: ", id)


    useEffect(()=>{
        const unsubricribed =navigation.addListener('focus',()=>{
            GetUser().then((user) => {
                SetUser(user.id)
            })
    
            console.log(user)
            GetProfileData()
           // console.log('Refreshing...')
        })
    }, [navigation])

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

    function handleNavigateToProfileProducts(){
        if(AsyncStorage.getItem('@Key:user')){
            
            navigation.navigate('ViewYourProducts')
        }else{
            navigation.navigate('ProfileProducts')
        }

    }

    function handleNavigateToUpdateProfile(){
        navigation.navigate('UpdateProfile',{Data: data})
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

        //console.log(imageData)

        await api.put(`profile/update/${id}`, imageData).catch(err => console.log(err))

        setImages([])
        GetProfileData()
    }

    return(
        <View style={styles.container}>
            <View>
                <ImageBackground style={styles.Waves} source={Waves}>
                        <View style={{flexDirection: 'row'}}>
                            {images.length>0?(
                                images.map((image,i,arr)=>{
                                    if(arr.length -1 ===i){
                                        {/*console.log({uri:image})*/}
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
                <View style={styles.InfoView}>
                    <Text style={styles.TopicText}>Biografia:</Text>
                    <Text style={styles.ContentText}>
                    {data?.description}
                    </Text>
                    <Text style={styles.TopicText}>Especialidades:</Text>
                    <Text style={styles.ContentText}>
                    {data?.specialty} 
                    </Text>
                    <Text style={styles.TopicText}>Contato:</Text>
                    <View style={styles.ButtonsView}>
                        <WhatsappButton number={data?.whatsapp} />
                        <EmailButton address={data?.email as string} />
                    </View>
                    <View style={{alignItems:'center', flexDirection: 'row'}}>
                        {console.log(data?.user_id)}
                    { user ==data?.user_id?(
                        <>
                            <RectButton onPress={handleNavigateToProfileProducts} style={[styles.ListButton, {alignSelf: 'flex-start'}]} >
                                <View style={styles.FlexRowView}>
                                    <FontAwesome name="birthday-cake" size={24} color='#FFF' style={{marginLeft: 5, marginTop: 5}} />
                                    <Text style={styles.ButtonText}>Lista de produtos</Text>
                                </View>
                            </RectButton>
                            <RectButton onPress={handleNavigateToUpdateProfile} style={[styles.ListButton,{alignSelf:'flex-end', backgroundColor:'#9553A0'}]} >
                            <View style={styles.FlexRowView}>
                                <FontAwesome name="edit" size={24} color='#FFF' style={{marginLeft: 5, marginTop: 5}} />
                                <Text style={styles.ButtonText}>Editar perfil</Text>
                            </View>
                            </RectButton>
                        </>
                        
                    ):(
                        <RectButton onPress={handleNavigateToProfileProducts} style={styles.ListButton} >
                            <View style={styles.FlexRowView}>
                                <FontAwesome name="birthday-cake" size={24} color='#FFF' style={{marginLeft: 5, marginTop: 5}} />
                                <Text style={styles.ButtonText}>Lista de produtos</Text>
                            </View>
                        </RectButton>
                    )}
                    
                    </View>
                </View>
            ):(
                <View style={styles.ProductsList}>
                <ScrollView contentContainerStyle={{
                            alignItems: 'center',
                            paddingTop: 40,
                            paddingBottom:210,
                            marginTop: -60
                        }}>
                            <ProductItem InfoButton={false} />
                            <ProductItem InfoButton={false} />
                            <ProductItem InfoButton={false} />
                            <ProductItem InfoButton={false} />
                        </ScrollView>
            </View>
            )}
        </View>
    )
}