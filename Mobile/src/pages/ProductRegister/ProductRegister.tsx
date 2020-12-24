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
import api from '../../services/api'

export default function ProductRegister(){
    const [value, setValue] = useState("0")
    const [images,setImages] = useState<string[]>([])
    const [name, setName] = useState<string>('')
    const [details,setDetails] = useState<string>('')
    const [price,setPrice] = useState<string>('')
    const categories = ['Não categorizado','Bolos','Tortas','Salgados','Biscoitos', 'Doces', 'Outros']

    const navigation = useNavigation()

    async function handleSubmitMultipartForm(){
        const data = new FormData()
        const index = value as unknown as number
        console.log("categoria: ", categories[index])

        data.append('name',name)
        data.append('detail',details)
        data.append('price',price)
        data.append('category',categories[index])

        images.forEach((image, index)=>{
            data.append('image',{
                name:`image_${index}.jpg`,
                type:'image/jpg',
                uri:image,

            } as any )
        })

        await api.post('products/create',data).then(response =>{
            console.log(response)
        }).catch(err => console.log(err))
        navigation.navigate('ViewYourProducts')
        console.log(data)

        setImages([])
        setPrice('')
        setName('')
        setDetails('')
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
                    <Input value={name} setData={setName} name="Nome: " placeholder="" />
                    <Text style={styles.InputText}>Foto:</Text>
                    <View style={{flexDirection: 'row',width:253}}>
                        {images.map(image=> (
                            <Image key={image} source={{uri: image}} style={styles.UploadedImage} />
                        ))}
                    {!images.length && (
                        <RectButton onPress={()=> handleSelectImages(images,setImages)} style={styles.UploadButton}>
                            <Feather name="plus" size={24} color='#FFF'/>
                        </RectButton>
                    )}
                    </View>


                    <Input value={details} setData={setDetails} name="Detalhes: " placeholder="" options={{
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
                            onValueChange={value => setValue((value as string))} 
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
                    <Input value={price} setData={setPrice} name="Preço: " placeholder="" />
                    <RectButton onPress={handleSubmitMultipartForm} style={styles.SubmitButton}>
                        <Text style={styles.SubmitButtonText}>Finalizar cadastro</Text>
                    </RectButton>
                </ScrollView>
            </View>
        </View>
    )
}