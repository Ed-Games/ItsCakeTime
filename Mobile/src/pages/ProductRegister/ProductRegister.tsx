import React, { useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, View } from 'react-native'
import styles from './styles'
import Waves from '../../images/waves.png'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { Picker } from '@react-native-picker/picker'
import selectImg from '../../images/select.png'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import handleSelectImages from '../../utils/ImageUpload'
import api from '../../services/api'
import { Formik } from 'formik'
import { ProductSchema } from '../../Schema/ProductSchema'
import { ImageUpload } from '../../utils/PickerImage'

type ProductData = {
    name: string,
    details: string,
    price: string,
    category: string,
    image: string
}

export default function ProductRegister(){
    const [images,setImages] = useState<string[]>([])
    const navigation = useNavigation()

    async function handleSubmitMultipartForm(values: ProductData){
        const data = new FormData()

        data.append('name',values.name)
        data.append('detail',values.details)
        data.append('price',values.price)
        data.append('category',values.category)
        data.append('image', {
            name:`image_${values.name}.jpg`,
            type:'image/jpg',
            uri:values.image,
        } as any)

        await api.post('products/create',data).then(response =>{
            console.log(response)
        }).catch(err => console.log(err))
        navigation.navigate('ViewYourProducts')
        console.log(data)

    }

    return(
        <View style={styles.container}>

            <View style={{height:230}}>
                <ImageBackground style={styles.Waves} source={Waves}>
                    <Header title="Preencha os dados e cadastre seu produto" titleStyle={{width:315,textAlign:'center'}} />
                </ImageBackground>
            </View>

            <View style={styles.FormView}>
                <Formik 
                initialValues={{name:'', details:'', price:'', category:'', image:''}}
                onSubmit={values => handleSubmitMultipartForm(values)}
                validationSchema={ProductSchema}
                >
                    {({
                        handleChange,
                        handleReset,
                        handleSubmit,
                        errors,
                        values
                    })=>(
                        <ScrollView style={{width: Dimensions.get('screen').width}} contentContainerStyle={{
                            alignItems: 'center',
                            paddingBottom: 100
                        }} >

                            <Input 
                            value={values.name} 
                            setData={handleChange('name')} 
                            name="Nome: " 
                            placeholder="" 
                            />

                            {errors.details && (
                                <Text style={{color:'red'}}>{errors.name}</Text>
                            )}

                            <Text style={styles.InputText}>Foto:</Text>

                            <View style={{flexDirection: 'row',width:253}}>
                                <Image key={values.image} source={{uri: values.image}} style={styles.UploadedImage} />
                            {values.image == '' && (
                                <RectButton 
                                onPress={()=> ImageUpload(handleChange('image'))} 
                                style={styles.UploadButton}>
                                    <Feather name="plus" size={24} color='#FFF'/>
                                </RectButton>
                            )}
                            </View>
                                {errors.image && (
                                    <Text style={{color:'red'}}>{errors.image}</Text>
                                )}
        
                            <Input 
                            value={values.details} 
                            setData={handleChange('details')} 
                            name="Detalhes: " 
                            placeholder="" 
                            options={{
                                useAsTextArea: true,
                                customStyle:{
                                    height:115
                                },
                                TextInputStyle:{
                                    height:115,
                                    alignItems: 'flex-start'
                                }
                            }} />

                            {errors.details && (
                                <Text style={{color:'red'}}>{errors.details}</Text>
                            )}

                            <Text style={styles.InputText}>Categoria: </Text>

                            <View style={styles.pickerView}>
                                <Picker 
                                    selectedValue={values.category} 
                                    onValueChange={handleChange('category')} 
                                    style={[styles.CategoryInput,{
                                        fontFamily: 'Poppins_300Light'
                                    }]}>
                                    <Picker.Item label="Selecionar" value="" />
                                        <Picker.Item label="Bolos" value="Bolos" />
                                        <Picker.Item label="Tortas" value="Tortas" />
                                        <Picker.Item label="Salgados" value="Salgados" />
                                        <Picker.Item label="Biscoitos" value="Biscoitos" />
                                        <Picker.Item label="Doces" value="Doces" />
                                        <Picker.Item label="Outros" value="Outros" />
                                </Picker>
                                <Image style={styles.selectImg} source={selectImg} />
                            </View>

                            {errors.category && (
                                <Text style={{color:'red'}}>{errors.category}</Text>
                            )}

                            <Input 
                            value={values.price} 
                            setData={handleChange('price')} 
                            name="Preço: " 
                            placeholder="" 
                            />

                            {errors.price && (
                                <Text style={{color:'red'}}>{errors.price}</Text>
                            )}

                            <RectButton onPress={handleSubmit as ()=>void} style={styles.SubmitButton}>
                                <Text style={styles.SubmitButtonText}>Finalizar cadastro</Text>
                            </RectButton>

                        </ScrollView>
                    )}
                </Formik>
            </View>
        </View>
    )
}