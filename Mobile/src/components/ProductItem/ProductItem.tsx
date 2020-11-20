import React from 'react'
import { Image, Text, View } from 'react-native'
import EmailButton from '../EmailButton/EmailButton'
import WhatsappButton from '../WhatsappButton/WhatsappButton'
import styles from './styles'
import Cake from '../../images/cake.jpg'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface ProductItemProps{
    InfoButton?: boolean,
    EditButton?:boolean
}

export default function ProductItem(props:ProductItemProps) {

    const navigation = useNavigation()

    function handleNavigateToProfile(){
        navigation.navigate('Profile')
    }

    function handleNavigateToEditProduct(){
        navigation.navigate('EditProduct')
    }

    return(
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
                {props.InfoButton!=false && (
                    <View style={{alignItems:'flex-start',marginRight:0}}>
                        <Text style={styles.LinkText}>Informações do vendedor</Text>
                        <View style={styles.LinkView}>
                            <RectButton onPress={handleNavigateToProfile} style={styles.LinkButton}>
                                <Feather name="arrow-right" size={24} color='#FFF' />
                            </RectButton>
                        </View>
                    </View>
                )} 
                {props.EditButton!=false &&(
                    <RectButton onPress={handleNavigateToEditProduct} style={styles.EditButton}>
                        <Feather name="edit" size={24} color="#FFF"/>
                    </RectButton>
                )}
            </View>
            <Text style={styles.ProductDescription}>Bolo de creme com calda de morango, perfeito para aniversarios infantis. Entregas ocorrem em até um dia após o pedido.</Text>
            <View style={styles.FlexRowView}>
                <WhatsappButton />
                <EmailButton />
            </View>
        </View>
    )
}