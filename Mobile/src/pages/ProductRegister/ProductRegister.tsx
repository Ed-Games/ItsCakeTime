import React, { useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, View } from 'react-native'
import styles from './styles'
import Waves from '../../images/waves.png'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { Picker } from '@react-native-community/picker'
import selectImg from '../../images/select.png'
import * as ImagePicker from 'expo-image-picker'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import handleSelectImages from '../../utils/ImageUpload'

export default function ProductRegister(){
    const [value, setValue] = useState("0")
    const [images,setImages] = useState<string[]>([])

    const navigation = useNavigation()

    function handleNavigateToYourProducts(){
        navigation.navigate('ViewYourProducts')
    }

    return(
        <View style={styles.container}>

            <View style={{height:230}}>
                <ImageBackground style={styles.Waves} source={Waves}>
                    <Header title="Preencha os dados e cadastre seu produto" titleStyle={{width:315,textAlign:'center'}} />
                </ImageBackground>
            </View>

            <View style={styles.FormView}>
                <ScrollView style={{width: Dimensions.get('screen').width}} contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom: 100
                }} >
                    <Input name="Nome: " placeholder="" />
                    
                    <Text style={styles.InputText}>Fotos</Text>
                    <View style={{flexDirection: 'row',width:253}}>
                        {images.map(image=> (
                            <Image key={image} source={{uri: image}} style={styles.UploadedImage} />
                        ))}
                    <RectButton onPress={()=> handleSelectImages(images,setImages)} style={styles.UploadButton}>
                        <Feather name="plus" size={24} color='#FFF'/>
                    </RectButton>
                    </View>


                    <Input name="Detalhes: " placeholder="" options={{
                        useAsTextArea: true,
                        customStyle:{
                            height:115
                        },
                        TextInputStyle:{
                            height:115,
                            alignItems: 'flex-start'
                        }
                    }} />
                    <Text style={styles.InputText}>Categoria: </Text>
                    <View style={styles.pickerView}>
                        <Picker 
                            selectedValue={value} 
                            onValueChange={value => setValue(value)} 
                            style={[styles.CategoryInput,{
                                fontFamily: 'Poppins_300Light'
                            }]}>
                            <Picker.Item label="Selecionar" value="0" />
                                <Picker.Item label="Bolos" value="1" />
                                <Picker.Item label="Tortas" value="2" />
                                <Picker.Item label="Salgados" value="3" />
                                <Picker.Item label="Biscoitos" value="4" />
                                <Picker.Item label="Doces" value="5" />
                                <Picker.Item label="Outros" value="6" />
                        </Picker>
                        <Image style={styles.selectImg} source={selectImg} />
                    </View>
                    <Input name="Preço: " placeholder="" />
                    <RectButton onPress={handleNavigateToYourProducts} style={styles.SubmitButton}>
                        <Text style={styles.SubmitButtonText}>Finalizar cadastro</Text>
                    </RectButton>
                </ScrollView>
            </View>
        </View>
    )
}