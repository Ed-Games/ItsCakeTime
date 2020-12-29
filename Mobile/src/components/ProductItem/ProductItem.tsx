import React from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import EmailButton from '../EmailButton/EmailButton'
import WhatsappButton from '../WhatsappButton/WhatsappButton'
import styles from './styles'
import Cake from '../../images/cake.jpg'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Data } from '../../pages/ViewYourProducts/ViewYourProducts'

interface ProductItemProps{
    InfoButton?: boolean,
    EditButton?:boolean,
    Data: Data,
}

export default function ProductItem(props:ProductItemProps) {


    const navigation = useNavigation()

    function handleNavigateToProfile(){
        navigation.navigate('Profile')
    }

    function handleNavigateToEditProduct(){
        navigation.navigate('EditProduct', {
            productId: props.Data.id
        })
    }

    return(
        <View key={props.Data.name+props.Data.image.length} style={styles.ProductItem}>
            <View style={styles.FlexRowView}>
                <Image style={styles.ProductImage} source={{uri:`http://10.0.0.105:3333/${props.Data.image}`}} />
                <View style={styles.FlexColumnView}>
                    <Text style={styles.CategoryText}>{`#${props.Data.category}`}</Text>
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
                <WhatsappButton />
                <EmailButton />
            </View>
        </View>
    )
}