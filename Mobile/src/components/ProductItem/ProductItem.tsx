import React from 'react'
import { Image, Text, View } from 'react-native'
import EmailButton from '../EmailButton/EmailButton'
import WhatsappButton from '../WhatsappButton/WhatsappButton'
import styles from './styles'
import Cake from '../../images/cake.jpg'

export default function ProductItem() {
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
            </View>
            <Text style={styles.ProductDescription}>Bolo de creme com calda de morango, perfeito para aniversarios infantis. Entregas ocorrem em até um dia após o pedido.</Text>
            <View style={styles.FlexRowView}>
                <WhatsappButton />
                <EmailButton />
            </View>
        </View>
    )
}