import React, { useEffect, useRef, useState } from 'react'
import { Alert, Dimensions, Image, ImageBackground, PickerProps, Text, View } from 'react-native'

import styles from './styles'
import Waves from '../../images/waves.png'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import selectImg from '../../images/select.png'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import ModalView from '../../components/Modal/ModalView'
import { ModalButton} from '../../components/Modal/ModalButton'
import { ModalText } from '../../components/Modal/ModalText'
import { Formik, FormikProps, FormikValues } from 'formik'
import { Picker } from '@react-native-picker/picker'
import { ImageUpload } from '../../utils/PickerImage'
import {ProductSchema} from '../../Schema/EditProductSchema'
import AppLoading from 'expo-app-loading'

export interface RouteProps{
    productId: number
}


type Product = {
    name: string,
    detail: string,
    price: string,
    image: string,
    category:string
}

export default function EditProduct(){
    const [image,setImage] = useState(true)
    const [productdata,setProductdata] = useState<Product>()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const categories = ['Bolos', 'Tortas', 'Salgados', 'Biscoitos', 'Doces', 'Outros']
    const formikRef = useRef<FormikProps<FormikValues>>(null)
    const navigation = useNavigation()

    function goBack(){
        navigation.goBack()
    }

    async function deleteProduct(){
        setModalVisible(false)
        const id = await AsyncStorage.getItem('@Key:tempId')
        if(id){
            await api.delete(`products/delete/${JSON.parse(id)}`).then(async response => {
                goBack()
    
            })
        }
    }

    useEffect(()=>{
        navigation.addListener('focus',()=>{
            GetProductData()
        })
    }, [navigation])

    useEffect(()=>{
        if(image == false){
            formikRef.current?.setFieldValue('image','',false)
        }
    },[image])


    async function GetProductData(){
        const id = await AsyncStorage.getItem('@Key:tempId')
        if(id){
            await api.get(`products/${JSON.parse(id)}`).then(async response => {
                setProductdata(await response.data)
            })
        }

    }

    async function handleUpdateProduct(values:Product){

         console.log(values)
        const id = await AsyncStorage.getItem('@Key:tempId')
        if(id){

            const data = new FormData()
            const name = values.name.replace(' ', '_')

            data.append('name', values.name)
            data.append('price', values.price as unknown as string)
            data.append('detail', values.detail)
            data.append('category', values.category)

            data.append('image',{
                name:`image_${name}.jpg`,
                type:'image/jpg',
                uri:values.image,

            } as any )
            

            await api.put(`products/update/${id}`,data).then(response => {
                goBack()
            }).catch(error => {
                if(error.message=="undefined is not an object (evaluating 'error.response.includes')") return
                console.log(error)
                Alert.alert('Ops! um erro ocorreu, tente novamente mais tarde')
            })

        }

    }
    

    return(
        
        <View style={styles.container}> 
            <View style={{height:160}}>
                <ImageBackground source={Waves} style={styles.waves}>
                    <View style={{marginBottom:60}} />
                    <Header titleStyle={{width:315,textAlign: 'center'}} title="Preencha os dados para atualizar seu produto" />
                </ImageBackground>
            </View>

            {productdata?(
                <Formik
                enableReinitialize={true}
                innerRef={formikRef}
                initialValues={{name:productdata.name, detail:productdata.detail, price: productdata.price, category:productdata.category, image:`http://10.0.0.105:3333/${productdata.image}`}}
                onSubmit={values => handleUpdateProduct(values as Product)}
                validationSchema={ProductSchema}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        errors,
                        values
                    })=>(
                    <>
                        <ScrollView contentContainerStyle={{alignItems: 'center', width:Dimensions.get('screen').width}}>
                        
                        <Input 
                        name="Nome: " 
                        defaultValue={productdata?.name}
                        setData={handleChange('name')} 
                        />
    
                        {errors.name && (
                            <Text style={{color:'red'}}>{errors.name}</Text>
                        )}
    
                        <Text style={styles.InputText}>Imagem:</Text>
    
                        <View style={{flexDirection: 'row', width:'70%'}}>
                                {image? 
                                (
                                <View style={{backgroundColor:'white', height:75, width:75, marginBottom:20}}>
                                    <Image key={values.image} source={{ uri: values.image}} style={styles.UploadedImage} />
                                    <RectButton onPress={()=> setImage(false)} style={styles.CloseButton}>
                                        <Feather name="x" size={18} color='#FFF' />
                                    </RectButton>
                                </View>
                                ): (
                                    <RectButton onPress={async()=> {
                                        const {cancelled} = await ImageUpload(handleChange('image')) 
                                        setImage(!cancelled)
                                    }} 
                                    style={styles.UploadButton}>
                                        <Feather name="plus" size={24} color='#FFF'/>
                                    </RectButton>   
                                )}
                        </View>
    
                        {errors.image && (
                            <Text style={{color:'red'}}>{errors.image}</Text>
                        )}
    
                        <Input 
                        options={{
                            useAsTextArea: true,
                            customStyle: {height:115}
                        }} 
                        name="Detalhes: " 
                        defaultValue={productdata?.detail} 
                        setData={handleChange('detail')} />
    
                        {errors.detail && (
                            <Text style={{color:'red'}}>{errors.detail}</Text>
                        )}
    
                        <Text style={styles.InputText}>Categoria: </Text>
                                <View style={styles.pickerView}>
                                    <Picker 
                                        onValueChange={handleChange('category')} 
                                        style={styles.CategoryInput}>
                                        <Picker.Item label={productdata.category} value={productdata?.category} />
                                        {categories.map((category, i) => {
                                            if(category!= productdata?.category){
                                                return (
                                                    <Picker.Item key={category+i} label={category} value={category} />
                                                )
                                            }
                                        })}
                                        
                                    </Picker>
                                    <Image style={styles.selectImg} source={selectImg} />
                                </View>
                        {errors.category && (
                            <Text style={{color:'red'}}>{errors.category}</Text>
                        )}
    
                        <Input 
                        name="Preço: " 
                        defaultValue={JSON.stringify(productdata?.price)} 
                        setData={handleChange('price')} 
                        />
    
                        {errors.price && (
                            <Text style={{color:'red'}}>{errors.price}</Text>
                        )}
    
                    </ScrollView>
    
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <RectButton onPress={handleSubmit as ()=>void} style={[styles.actionButton,{backgroundColor:'#2BAF80'}]}>
                                <Text style={styles.actionButtonText}>Salvar</Text>
                            </RectButton>
                            <RectButton onPress={goBack} style={[styles.actionButton,{backgroundColor:'#455A64'}]}>
                                <Text style={styles.actionButtonText}>Cancelar</Text>
                            </RectButton>
                            <RectButton onPress={()=>setModalVisible(true)} style={[styles.actionButton,{backgroundColor:'#FF0909'}]}>
                                <Text style={styles.actionButtonText}>Deletar</Text>
                            </RectButton>
                        </View>
                    </>
                    )}
                </Formik>
            ):(
                <AppLoading />
            )}

            
            <ModalView title="Atenção" isVisible={modalVisible} setStateFunction={setModalVisible}>
                <ModalText>Você tem certeza que deseja excluir esse produto?</ModalText>
                <View style={{flexDirection:"row",justifyContent:"space-between", padding:10}}>
                    <ModalButton onPress={deleteProduct}>
                        <ModalText>Sim</ModalText>
                    </ModalButton>

                    <ModalButton onPress={()=>setModalVisible(false)}>
                        <ModalText>Não</ModalText>
                    </ModalButton>
                </View>
            </ModalView>
            
        </View>
    )
}