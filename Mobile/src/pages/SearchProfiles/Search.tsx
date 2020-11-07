import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

import styles from './styles'
import Waves from '../../images/waves.png'
import Header from '../../components/Header/Header'
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import Avatar from '../../images/avatar.png'
import { useNavigation } from '@react-navigation/native'

export default function Search(){

    const navigation = useNavigation()

    function handleNavigateToProfile(){
        navigation.navigate('Profile')
    }

    return(
        <View style={styles.container}>
            <View>
                <ImageBackground source={Waves} style={styles.Waves}>
                    <View style={styles.search}>
                        <TextInput style={styles.searchInput} placeholder="Procure um confeiteiro pelo nome de perfil" />
                        <View style={styles.searchButtonView}>
                            <RectButton style={styles.SearchButton}>
                                <Feather name="search" size={24} color='#FFF'/>
                            </RectButton>
                        </View>
                    </View>
                </ImageBackground>

                <ScrollView>
                <RectButton onPress={handleNavigateToProfile}>
                    <View style={styles.AvatarView}>
                        <Image style={styles.Avatar} source={Avatar} />
                        <View>
                            <Text style={styles.avatarname}>Alice Andrade Campus</Text>
                            <View style={{flexDirection:'row'}}>
                            <Text style={styles.avatarSpecialtyBold}>Especialidades: </Text><Text style={styles.avatarSpecialty}>Bolos e tortas para eventos</Text>
                            </View>
                        </View>
                    </View>
                </RectButton>
                

                
                </ScrollView>
                
            </View>
        </View>
    )
}

