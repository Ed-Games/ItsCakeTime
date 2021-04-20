import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

import styles from './styles'
import Waves from '../../images/waves.png'
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import Avatar from '../../images/avatar.png'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

interface ProfileProps extends Omit<Profile, 'id'>{
    id:string,
}

export default function Search(){
    const [profiles, setProfiles] = useState<ProfileProps[]>()
    const[selectedProfile, setSelectedProfile] = useState<string>()

    const navigation = useNavigation()

    function handleNavigateToProfile(id: string, userName:string){
         navigation.navigate('Details',{
             screen: 'Details',
             params: {id}
         })
    }

    async function GetAllProfiles(){
        await api.get('profile').then(response=>{
            setProfiles(response.data)
            console.log(response.data)
        })
    }

    async function GetSearchResults(){
        console.log(selectedProfile)
        await api.get('profile/search', {
            params: {
                search: selectedProfile
            }
        }).then(response=>{
            setProfiles(response.data)
            console.log(response.data)
        })
    }

    useEffect(() => {
        GetAllProfiles()
    },[])

    return(
        <View style={styles.container}>
            <View>
                <ImageBackground source={Waves} style={styles.Waves}>
                    <View style={styles.search}>
                        <TextInput onChangeText={value=> setSelectedProfile(value)} style={styles.searchInput} placeholder="Procure um confeiteiro pelo nome de perfil" />
                        <View style={styles.searchButtonView}>
                            <RectButton onPress={GetSearchResults} style={styles.SearchButton}>
                                <Feather name="search" size={24} color='#FFF'/>
                            </RectButton>
                        </View>
                    </View>
                </ImageBackground>

                <ScrollView>
                {profiles?.map(profile => {
                    return(
                        <RectButton  key={profile.userName} onPress={()=> handleNavigateToProfile(profile.id, profile.userName)}>
                        <View style={styles.AvatarView}>
                            <Image style={styles.Avatar} source={{uri:`http://10.0.0.105:3333/uploads/${profile.image}`}} />
                            <View>
                                <Text style={styles.avatarname}>{profile.userName}</Text>
                                <View style={{flexDirection:'row',width:'95%'}}>
                                <Text style={styles.avatarSpecialtyBold}>Especialidades: <Text style={styles.avatarSpecialty}>{profile.specialty}</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </RectButton>
                    )
                })}
                

                
                </ScrollView>
                
            </View>
        </View>
    )
}

