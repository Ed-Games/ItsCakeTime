import React, {useEffect, useState } from 'react'
import { Text, View,TextInput, Image, ImageBackground, ScrollView} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import styles from './styles'
import {Feather, FontAwesome5} from '@expo/vector-icons'
import selectImg from '../../images/select.png'
import Waves from '../../images/waves.png'
import { RectButton } from 'react-native-gesture-handler'
import ProductItem from '../../components/ProductItem/ProductItem'
import Header from '../../components/Header/Header'
import api from '../../services/api'


export default function ProductsList() {
    const [value, setValue] = useState('')
    const [data, setData] = useState<Product[]>()
    const [price, setPrice] = useState('')
    
    function GetListOfProducts(){
        api.get('products').then((response => {
            setData(response.data)
        }))
    }

    async function handleFilterResults(){
        await api.get('product/filter/',{
            params: {
                price,
                category: value
            }
        }).then((response => {
            setData(response.data)
        })).catch((error) => {
            console.log(error)
        })
    }

    function clear(){
        setPrice('')
        setValue('')
        GetListOfProducts()
    }

    useEffect(() => {GetListOfProducts()},[])

    return(
        <View style={styles.container}>
            <View style={{height:270}}>
                <ImageBackground source={Waves} style={styles.waves}>
                    <Header title='Produtos Disponíveis' />
                    <Text style={styles.filterText}>Filtre sua busca:</Text>
                    <View style={styles.FilterView}>
                        <Text style={styles.FilterViewText}>Preço</Text>
                        <TextInput value={price} onChangeText={text=> setPrice(text)} placeholder='R$ 00,00' style={styles.FilterViewInput} />
                        <Text style={styles.FilterViewText}>Categoria</Text>

                        <View style={styles.pickerView}>
                            <Picker 
                            selectedValue={value} 
                            onValueChange={value => setValue(value)} 
                            style={[styles.FilterViewSelect,{
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
                    </View>
                        <View style={styles.buttonsContainer}> 
                            <RectButton enabled={price && value? true: false} onPress={handleFilterResults} style={price && value? styles.filterButton : [styles.filterButton, {backgroundColor:'#BF79B9'}]}>
                                <Feather name="search" size={25} color='#FFF' />
                                <Text style={styles.FilterViewText}>Pesquisar</Text>
                            </RectButton>
                            <RectButton enabled={price || value? true:false } onPress={clear} style={price || value? styles.filterButton : [styles.filterButton, {backgroundColor:'#BF79B9'}]}>
                                <FontAwesome5 name="broom" size={20} color='#FFF'/>
                                <Text style={styles.FilterViewText}>Limpar</Text>
                            </RectButton>
                        </View>
                </ImageBackground>
            </View>
            <View style={styles.ProductsList}>
                <ScrollView contentContainerStyle={{
                            alignItems: 'center',
                            paddingTop: 40,
                            paddingBottom:210,
                            marginTop: -70
                        }}>
                            {data?.map((product,i)=>{
                                return (
                                    <ProductItem key={product.name+" numero: "+i} Data={product} EditButton={false} />
                                )
                            })}
                </ScrollView>
            </View>
            
        </View>
    )
}