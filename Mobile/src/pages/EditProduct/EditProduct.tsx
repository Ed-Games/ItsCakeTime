import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Image, ImageBackground, Text, View } from 'react-native'

import styles from './styles'
import Waves from '../../images/waves.png'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import { Picker } from '@react-native-community/picker'
import selectImg from '../../images/select.png'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import handleSelectImages from '../../utils/ImageUpload'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import ReactPicker from '../../components/ReactPicker/ReactPicker'
import ModalView from '../../components/Modal/Modal'

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
    const [value, setValue] = useState<number>()
    const [initialCategory, setInitialCategory] = useState<number>()
    const [changeImage, setChangeImage] = useState(0)
    const [name, setName] = useState<string>('')
    const [detail, setDetail] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const categories = ["Não categorizado","Bolos","Tortas","Salgados","Biscoitos", "Doces", "Outros"]
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    
    const navigation = useNavigation()

    function goBack(){
        navigation.goBack()
    }

    async function deleteProduct(){
        setModalVisible(false)
        const id = await AsyncStorage.getItem('@Key:tempId')
        if(id){
            await api.delete(`products/delete/${JSON.parse(id)}`).then(async response => {
                console.log(response.data)
                goBack()
    
            })
        }
    }

    function handleSetcategory(category:string){
        setInitialCategory(categories.indexOf(category))
        console.log("Category: ",categories.indexOf(category))
        console.log("VALUE: ",value)
    }

    useEffect(()=>{
        const unsubricribed =navigation.addListener('focus',()=>{
            setImages([])
            GetProductData()
            setChangeImage(0)
        })
    }, [navigation])


    async function GetProductData(){
        const id = await AsyncStorage.getItem('@Key:tempId')
        if(id){
            await api.get(`products/${JSON.parse(id)}`).then(async response => {
                setProductdata(response.data)
                handleSetcategory(response.data.category)
    
            })
        }

    }

    async function handleUpdateProduct(){
        const id = await AsyncStorage.getItem('@Key:tempId')
        if(id){

            const data = new FormData()

            if(name!='') data.append('name', name)
            if(price!='') data.append('price', price)
            if(detail!='') data.append('detail', detail)

            if(value){
                data.append('category', categories[value as any])
            }

            images.forEach((image, index)=>{
                data.append('image',{
                    name:`image_${index}.jpg`,
                    type:'image/jpg',
                    uri:image,
    
                } as any )
            })

            setImages([])
            

            console.log("olha os dados aqui: ",data)

            await api.put(`products/update/${id}`,data).then(response => {
                console.log(response.data)
            }).catch(error => {
                if(error.message=="undefined is not an object (evaluating 'error.response.includes')") return
                console.log(error)
                Alert.alert('Ops! um erro ocorreu, tente novamente mais tarde')
            })

            goBack()
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

            <ScrollView contentContainerStyle={{alignItems: 'center', width:Dimensions.get('screen').width}}>
                <Input name="Nome: " defaultValue={productdata?.name} setData={setName} />

                <Text style={styles.InputText}>Fotos</Text>
                        <View style={{flexDirection: 'row',width:253}}>
                            {images.map(image=> (
                                <Image key={image} source={{uri: image}} style={styles.UploadedImage} />
                            ))}
                        {images.length == 0 && (
                            <>
                                {changeImage == 0?(
                                    <>
                                    <Image source={{uri:`http://10.0.0.105:3333/${productdata?.image}`}} style={styles.EditUploadedImage} />
                                    <RectButton onPress={()=> setChangeImage(1)} style={styles.CloseButton}>
                                        <Feather name="x" size={18} color='#FFF'/>
                                    </RectButton>
                                    </>
                                ):(
                                    <RectButton onPress={()=> handleSelectImages(images,setImages)} style={styles.UploadButton}>
                                        <Feather name="plus" size={18} color='#FFF'/>
                                    </RectButton>
                                )}
                            </>
                        )}
                        </View>

                <Input options={{
                    useAsTextArea: true,
                    customStyle: {height:115}
                }} name="Detalhes: " defaultValue={productdata?.detail} setData={setDetail} />

                <Text style={styles.InputText}>Categoria: </Text>
                        <View style={styles.pickerView}>
                            { value==0 || value==undefined || value==null?(
                                <ReactPicker value={initialCategory as number} setValue={setValue} />
                            ):(
                                <ReactPicker value={value as number} setValue={setValue} />
                            )}
                            {/* PRECISO RESOLVER ISSO COM URGÊNCIA!!!  */}
                            <Image style={styles.selectImg} source={selectImg} />
                        </View>
                <Input name="Preço: " defaultValue={JSON.stringify(productdata?.price)} setData={setPrice} />
            </ScrollView>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RectButton onPress={handleUpdateProduct} style={[styles.actionButton,{backgroundColor:'#2BAF80'}]}>
                    <Text style={styles.actionButtonText}>Salvar</Text>
                </RectButton>
                <RectButton onPress={goBack} style={[styles.actionButton,{backgroundColor:'#455A64'}]}>
                    <Text style={styles.actionButtonText}>Cancelar</Text>
                </RectButton>
                <RectButton onPress={()=>setModalVisible(true)} style={[styles.actionButton,{backgroundColor:'#FF0909'}]}>
                    <Text style={styles.actionButtonText}>Deletar</Text>
                </RectButton>
            </View>

            <ModalView
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            title="Atenção"
            contentText=" Deseja realmente apagar esse produto?"
            actionText="Não"
            ContentBlock={
                <RectButton 
                onPress={deleteProduct} 
                style={{
                    flexDirection: 'column',
                    width: 50,
                    position: 'absolute',
                    marginTop: 145,
                }}>
                    <Text style={{
                        fontFamily:'Poppins_500Medium',
                        fontSize: 18,
                        color: '#9553A0',
                        alignSelf:'flex-end',
                    }}>Sim</Text>
                </RectButton>
            }
            />
            
        </View>
    )
}