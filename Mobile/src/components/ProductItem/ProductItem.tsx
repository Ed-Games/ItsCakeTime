import React from 'react'
import {Image, Text, View } from 'react-native'
import EmailButton from '../EmailButton/EmailButton'
import WhatsappButton from '../WhatsappButton/WhatsappButton'
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useProduct } from '../../Contexts/ProductContext'

interface ProductItemProps{
    InfoButton?: boolean,
    EditButton?:boolean,
    Data: Product
}

export default function ProductItem(props:ProductItemProps) {
    const navigation = useNavigation()
    const {setSelectedProduct} = useProduct()

    function handleNavigateToProfile(){
        navigation.navigate('Details', {id: props.Data.user_id})
    }

    async function handleNavigateToEditProduct(){
        setSelectedProduct(props.Data)
        navigation.navigate('EditProduct')
    }

    return(
        <View style={styles.ProductItem}>
            <View style={styles.FlexRowView}>
                <Image style={styles.ProductImage} source={{uri:props.Data.imageUrl}} />
                <View style={styles.FlexColumnView}>
                    <Text style={styles.CategoryText}>{props.Data.category? `#${props.Data.category}`: '#sem categoria'}</Text>
                    <Text style={styles.ProductTitle}>{props.Data.name}</Text>
                    <View style={styles.FlexRowView}>
                        <Text style={styles.ProductPriceLabel}>Preço: </Text><Text style={styles.ProductPriceValue}>{`${props.Data.price} R$`}</Text>
                    </View>
                </View>
                {props.InfoButton!=false && (
                    <RectButton onPress={handleNavigateToProfile} style={styles.InfoButton}>
                        <Text style={styles.InfoText}>Informações do vendedor</Text>
                        <View style={styles.InfoView}>
                            <Feather name="arrow-right" size={24} color='#FFF'/>
                        </View>
                    </RectButton>
                )} 
                {props.EditButton!=false &&(
                    <RectButton onPress={handleNavigateToEditProduct} style={styles.EditButton}>
                        <Feather name="edit" size={24} color="#FFF"/>
                    </RectButton>
                )}
            </View>
            <Text style={styles.ProductDescription}>{props.Data.detail}</Text>
            <View style={styles.FlexRowView}>
                {props.Data.whatsapp && (
                    <WhatsappButton number ={props.Data.whatsapp} />
                )}
                {props.Data.email && (
                    <EmailButton address ={props.Data.email}/>
                )}
            </View>
        </View>
    )
}