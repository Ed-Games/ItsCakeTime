import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, View } from 'react-native'

import styles from './styles'
import Waves from '../../images/waves.png'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import { Picker } from '@react-native-community/picker'
import selectImg from '../../images/select.png'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import handleSelectImages from '../../utils/ImageUpload'
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'

export interface RouteProps{
    productId: number
}

export interface ProductDataProps{
    category: string,
    detail: string,
    email: string,
    image: string,  
    name: string,
    price: string,
    userName?: string,
}

export default function EditProduct(){
    const [images,setImages] = useState<string[]>([])
    const [productdata,setProductdata] = useState<ProductDataProps>()
    const [value, setValue] = useState('0')
    const categories = ["Não categorizado","Bolos","Tortas","Salgados","Biscoitos", "Doces", "Outros"]
    
    const navigation = useNavigation()

    function goBack(){
        navigation.goBack()
    }

    function handleSetcategory(){
        categories.forEach(category => {
          if(category == productdata?.category){
              console.log(productdata?.category)
          }
      })
    }

    useEffect(()=>{
        const unsubricribed =navigation.addListener('focus',()=>{
            GetProductData()
        })
    }, [navigation])

    async function GetProductData(){
        const id = await AsyncStorage.getItem('@Key:tempId')
        if(id){
            await api.get(`products/${JSON.parse(id)}`).then(async response => {
                setProductdata(response.data)
                console.log("Dados: ",productdata)
                handleSetcategory()
    
            })
        }

        await AsyncStorage.removeItem('@Key:tempId')
    }

    return(
        
        <View style={styles.container}> 
            <View style={{height:160}}>
                <ImageBackground source={Waves} style={styles.waves}>
                    <View style={{marginBottom:60}} />
                    <Header titleStyle={{width:315,textAlign: 'center'}} title="Preencha os dados para atualizar seu produto" />
                </ImageBackground>
            </View>

            <ScrollView contentContainerStyle={{alignItems: 'center', width:Dimensions.get('screen').width}}>
                <Input name="Nome: " defaultValue={productdata?.name} />

                <Text style={styles.InputText}>Fotos</Text>
                        <View style={{flexDirection: 'row',width:253}}>
                            {images.map(image=> (
                                <Image key={image} source={{uri: image}} style={styles.UploadedImage} />
                            ))}
                        <RectButton onPress={()=> handleSelectImages(images,setImages)} style={styles.UploadButton}>
                            <Feather name="plus" size={24} color='#FFF'/>
                        </RectButton>
                        </View>

                <Input options={{
                    useAsTextArea: true,
                    customStyle: {height:115}
                }} name="Detalhes: " defaultValue={productdata?.detail} />

                <Text style={styles.InputText}>Categoria: </Text>
                        <View style={styles.pickerView}>
                            <Picker 
                                selectedValue={value} 
                                onValueChange={value => setValue(value as string)} 
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
                <Input name="Preço: " defaultValue={JSON.stringify(productdata?.price)} />
            </ScrollView>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RectButton onPress={goBack} style={[styles.actionButton,{backgroundColor:'#2BAF80'}]}>
                    <Text style={styles.actionButtonText}>Salvar</Text>
                </RectButton>
                <RectButton onPress={goBack} style={[styles.actionButton,{backgroundColor:'#455A64'}]}>
                    <Text style={styles.actionButtonText}>Cancelar</Text>
                </RectButton>
                <RectButton onPress={goBack} style={[styles.actionButton,{backgroundColor:'#FF0909'}]}>
                    <Text style={styles.actionButtonText}>Deletar</Text>
                </RectButton>
            </View>
            
        </View>
    )
}