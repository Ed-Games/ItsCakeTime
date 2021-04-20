import { FontAwesome } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import EmailButton from '../EmailButton/EmailButton'
import WhatsappButton from '../WhatsappButton/WhatsappButton'
import styles from './styles'

interface BiographyProps {
    data: Profile,
    user: number
}


export default function Biography(props: BiographyProps){

    const navigation = useNavigation()

    function handleNavigateToProfileProducts(){
        if(AsyncStorage.getItem('@Key:user')){
            
            navigation.navigate('ViewYourProducts')
        }else{
            navigation.navigate('ProfileProducts')
        }
        
    }

    function handleNavigateToProductsList(){
        navigation.navigate('ProfileProducts')
    }

    function handleNavigateToUpdateProfile(){
        navigation.navigate('UpdateProfile',{Data: props.data})
    }
    

    return (
        <View style={styles.InfoView}>
            <Text style={styles.TopicText}>Biografia:</Text>
            <Text style={styles.ContentText}>
            {props.data?.description}
            </Text>
            <Text style={styles.TopicText}>Especialidades:</Text>
            <Text style={styles.ContentText}>
            {props.data?.specialty} 
            </Text>
            <Text style={styles.TopicText}>Contato:</Text>
            <View style={styles.ButtonsView}>
                <WhatsappButton number={props.data?.whatsapp} />
                <EmailButton address={props.data?.email as string} />
            </View>
            <View style={{alignItems:'center', flexDirection: 'row'}}>
                {console.log(props.data?.user_id)}
            { props.user ==props.data?.user_id?(
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
                <RectButton onPress={handleNavigateToProductsList} style={styles.ListButton} >
                    <View style={styles.FlexRowView}>
                        <FontAwesome name="birthday-cake" size={24} color='#FFF' style={{marginLeft: 5, marginTop: 5}} />
                        <Text style={styles.ButtonText}>Lista de produtos</Text>
                    </View>
                </RectButton>
            )}
            
            </View>
        </View>
    )       

}