import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

import styles from './styles'
import notFoundImg from '../../images/NotFound.png'
import Waves from '../../images/waves.png'
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

interface ProfileProps extends Omit<Profile, 'id'>{
    id:string,
}

export default function Search(){
    const [profiles, setProfiles] = useState<ProfileProps[]>()
    const[selectedProfile, setSelectedProfile] = useState<string>()

    const navigation = useNavigation()

    function handleNavigateToProfile(id: string){
        setProfiles([])
        navigation.navigate('Details',{id})
    }

    async function GetAllProfiles(){
        await api.get('profile').then(response=>{
            setProfiles(response.data)
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
        })
    }

    useEffect(() => {
        navigation.addListener('focus',()=>{
            GetAllProfiles()
        })
    },[])

    return(
        <View style={styles.container}>
            <View>
                <ImageBackground source={Waves} style={styles.Waves}>
                    <View style={styles.search}>
                        <TextInput 
                        onChangeText={(value)=> setSelectedProfile(value)} 
                        style={styles.searchInput} 
                        placeholder="Procure um confeiteiro pelo nome de perfil" 
                        autoCapitalize='none'
                        />
                            <View style={selectedProfile?styles.searchButtonView : [styles.searchButtonView,{backgroundColor:'#BF79B9'}]}>
                                <RectButton enabled={selectedProfile? true: false} onPress={GetSearchResults} style={selectedProfile? styles.SearchButton : [styles.SearchButton, {backgroundColor:'#BF79B9'}]}>
                                    <Feather name="search" size={24} color='#FFF'/>
                                </RectButton>
                            </View>
                    </View>
                </ImageBackground>

                {profiles?.length !=0? (
                    <ScrollView>
                    {profiles?.sort().map(profile => {
                        return(
                            <RectButton  key={profile.userName+profile.id} onPress={()=> handleNavigateToProfile(profile.id)}>
                            <View style={styles.AvatarView}>
                                <Image style={styles.Avatar} source={{uri: profile.imageUrl}} />
                                <View>
                                    <Text style={styles.avatarname}>{profile.userName}</Text>
                                    <View style={{flexDirection:'row',width:'95%'}}>
                                    <Text style={styles.avatarSpecialtyBold}>Especialidades: <Text style={styles.avatarSpecialty}>{profile.specialty? profile.specialty : 'Nenhuma especialidade informada'}</Text> </Text>
                                    </View>
                                </View>
                            </View>
                        </RectButton>
                        )
                    })}
                    
                    </ScrollView>
                ): (
                    <View style={{marginTop:50, alignSelf:'center'}}>
                        <Image style={styles.notFoundImg} source={notFoundImg} />
                        <Text style={styles.notFoundText}>Ops!... sem resultados para sua pesquisa</Text>
                    </View>
                )}
                
            </View>

        </View>
    )
}

