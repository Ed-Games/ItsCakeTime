import React, { useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, View } from 'react-native'

import styles from './styles'
import Waves from '../../images/waves.png'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import { Picker } from '@react-native-community/picker'
import selectImg from '../../images/select.png'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import handleSelectImages from '../../utils/ImageUpload'

export default function EditProduct(){
    const [value, setValue] = useState("0")
    const [images,setImages] = useState<string[]>([])

    return(
        <View style={styles.container}> 
            <View style={{height:160}}>
                <ImageBackground source={Waves} style={styles.waves}>
                    <View style={{marginBottom:60}} />
                    <Header titleStyle={{width:315,textAlign: 'center'}} title="Preencha os dados e cadastre seu produto" />
                </ImageBackground>
            </View>

            <ScrollView contentContainerStyle={{alignItems: 'center', width:Dimensions.get('screen').width}}>
                <Input name="Nome: " defaultValue="Bolo de aniversario" />

                <Text style={styles.InputText}>Fotos</Text>
                        <View style={{flexDirection: 'row',width:253}}>
                            {images.map(image=> (
                                <Image key={image} source={{uri: image}} style={styles.UploadedImage} />
                            ))}
                        <RectButton onPress={()=> handleSelectImages(images,setImages)} style={styles.UploadButton}>
                            <Feather name="plus" size={24} color='#FFF'/>
                        </RectButton>
                        </View>

                <Input options={{
                    useAsTextArea: true,
                    customStyle: {height:115}
                }} name="Detalhes: " defaultValue="Bolo de creme com calda de morango, perfeito para aniversarios infantis. Entregas ocorrem em até um dia após o pedido." />

                <Text style={styles.InputText}>Categoria: </Text>
                        <View style={styles.pickerView}>
                            <Picker 
                                selectedValue={value} 
                                onValueChange={value => setValue(value)} 
                                style={[styles.CategoryInput,{
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
                <Input name="Preço: " defaultValue="35,00" />
            </ScrollView>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RectButton style={[styles.actionButton,{backgroundColor:'#2BAF80'}]}>
                    <Text style={styles.actionButtonText}>Salvar</Text>
                </RectButton>
                <RectButton style={[styles.actionButton,{backgroundColor:'#455A64'}]}>
                    <Text style={styles.actionButtonText}>Cancelar</Text>
                </RectButton>
                <RectButton style={[styles.actionButton,{backgroundColor:'#FF0909'}]}>
                    <Text style={styles.actionButtonText}>Deletar</Text>
                </RectButton>
            </View>
            
        </View>
    )
}