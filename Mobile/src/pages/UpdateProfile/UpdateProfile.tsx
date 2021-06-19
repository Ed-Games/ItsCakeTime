import React from 'react'
import {ImageBackground, Text, View } from 'react-native'
import styles from './styles'
import Waves from '../../images/waves.png'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import { RectButton} from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../../services/api'
import { Formik } from 'formik'
import { ProfileSchema } from '../../Schema/ProfileSchema'
import { useUser } from '../../Contexts/UserContext'


interface Data{
    Data : {
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
}

type ProfileUpdateFormValues = {
    description: string, 
    specialty: string,
    whatsapp: string
}

export default function UpdateProfile(){
    
    const profileData = useRoute().params as Data
    console.log(profileData)
    const {loggedUser} = useUser()
    const navigation = useNavigation()

    function handleNavigateToProfile(){
        navigation.navigate('Profile')
    }

    async function handleUpdateProfile( values: ProfileUpdateFormValues){
        const data = new FormData()

        data.append('description', values.description)
        data.append('specialty', values.specialty)
        data.append('whatsapp', values.whatsapp)
        
        console.log("dados:", data)

        await api.put(`/profile/update/${loggedUser.id}/`, data).then((response) =>{
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

            <Formik 
            initialValues={{description: '', specialty:'', whatsapp:''}}
            validationSchema={ProfileSchema}
            onSubmit={values => handleUpdateProfile(values)}
            >
                {({
                    handleChange,
                    handleSubmit,
                    errors
                })=>(
                    <View style={styles.FormView}>

                        {profileData && (
                            <>
                            <Input
                            defaultValue={profileData.Data.description}
                            setData={handleChange('description')} 
                            name="Descrição"
                            placeholder='Adicione uma descrição' 
                            options={{
                                customStyle:{height:115,alignItems:'flex-start'},
                                useAsTextArea: true,
                                TextInputStyle: {
                                    height:115,
                                    alignSelf: 'flex-start',
                                }
                            }} 
                            />

                            {errors.description && (
                                <Text style={{color:'red'}}>{errors.description}</Text>
                            )}
        
                            <Input 
                            defaultValue={profileData?.Data.specialty}
                            setData={handleChange('specialty')}
                            placeholder="Qual sua especialidade?"
                            name="Especialidade"
                            />

                            {errors.specialty && (
                                <Text style={{color:'red'}}>{errors.specialty}</Text>
                            )}
            
                            <Input 
                            defaultValue={profileData?.Data.whatsapp}
                            setData={handleChange('whatsapp')}
                            name="Whatsapp"
                            />

                            {errors.whatsapp && (
                                <Text style={{color:'red'}}>{errors.whatsapp}</Text>
                            )}

                            </>
                        )}

                        <RectButton
                        onPress={handleSubmit as ()=>void} 
                        style={styles.SubmitButton}
                        >
                            <Text style={styles.SubmitButtonText}>
                                Finalizar 
                            </Text>
                        </RectButton>
                    </View>
                )}
            </Formik>
        </View>
    )
}