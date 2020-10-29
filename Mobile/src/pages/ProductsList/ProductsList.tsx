import React, { useState } from 'react'
import { Text, View,TextInput, Image, ImageBackground} from 'react-native'
import {Picker} from '@react-native-community/picker'
import styles from './styles'
import {Feather, FontAwesome} from '@expo/vector-icons'

import selectImg from '../../images/select.png'
import background from '../../images/background.png'
import Cake from '../../images/cake.jpg'
import { RectButton } from 'react-native-gesture-handler'

export default function ProductsList() {
    const [value, setValue] = useState("0")
    return(
        <View style={styles.container}>

            <Text style={styles.title}>Produtos Disponíveis:</Text>
            <Text style={styles.filterText}>Filtre sua busca:</Text>

            <View style={styles.FilterView}>
                <Text style={styles.FilterViewText}>Preço</Text>
                <TextInput placeholder='R$ 00,00' style={styles.FilterViewInput} />
                <Text style={styles.FilterViewText}>Categoria</Text>

                <View style={styles.pickerView}>
                    <Picker 
                    selectedValue={value} 
                    onValueChange={value => setValue(value)} 
                    style={[styles.FilterViewSelect,{
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
            </View>
                <RectButton style={styles.filterButton}>
                    <Feather name="filter" size={25} color='#FFF' />
                </RectButton>

                <ImageBackground source={background} style={styles.ProductsList}>
                    <View style={styles.ProductItem}>
                        <View style={styles.FlexRowView}>
                            <Image style={styles.ProductImage} source={Cake} />
                            <View style={styles.FlexColumnView}>
                                <Text style={styles.CategoryText}>#Bolos</Text>
                                <Text style={styles.ProductTitle}>Bolo de aniversario</Text>
                                <View style={styles.FlexRowView}>
                                    <Text style={styles.ProductPriceLabel}>Preço: </Text><Text style={styles.ProductPriceValue}>R$ 35,00</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.ProductDescription}>Bolo de creme com calda de morango, perfeito para aniversarios infantis. Entregas ocorrem em até um dia após o pedido.</Text>
                        <View style={styles.FlexRowView}>
                            <RectButton style={styles.WhatsappButton}>
                                <View style={styles.FlexRowView}>
                                    <FontAwesome name="whatsapp" size={24} color='#FFF' style={{marginLeft: 5, marginTop: 5}} />
                                    <Text style={styles.ButtonText}>Whatsapp</Text>
                                </View>
                            </RectButton>
                            <RectButton style={styles.EmailButton}>
                                <View style={styles.FlexRowView}>
                                    <Feather name="mail" size={24} color='#FFF' style={{marginLeft: 5, marginTop: 5}} />
                                    <Text style={styles.ButtonText}>Enviar um Email</Text>
                                </View>
                            </RectButton>
                        </View>
                        </View>
                </ImageBackground>

        </View>
    )
}