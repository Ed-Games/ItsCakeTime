import React, { useState } from 'react'
import { Text, View,TextInput, Image, ImageBackground, ScrollView} from 'react-native'
import {Picker} from '@react-native-community/picker'
import styles from './styles'
import {Feather, FontAwesome} from '@expo/vector-icons'

import selectImg from '../../images/select.png'
import background from '../../images/background.png'
import { RectButton } from 'react-native-gesture-handler'
import ProductItem from '../../components/ProductItem/ProductItem'

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
                    <ScrollView contentContainerStyle={{
                        alignItems: 'center',
                        paddingTop: 20,
                        paddingBottom:60
                    }}>
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                    </ScrollView>
                </ImageBackground>

        </View>
    )
}