import { Poppins_600SemiBold } from "@expo-google-fonts/poppins"
import { Dimensions, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    ProductItem : {
        marginTop: 30,
        backgroundColor: '#FFF',
        width: Dimensions.get('screen').width -30,
        paddingBottom:15,
        borderRadius: 20,

    },

    FlexRowView: {
        flexDirection: 'row',
    },

    FlexColumnView : {
        flexDirection: 'column',

    },

    ProductImage:{
        width: 77,
        height: 77,
        borderRadius: 50,
        marginTop: 13,
        marginLeft: 13,
        marginRight: 13,
    },

    CategoryText:{
        color: '#F159E2',
        fontSize: 15,
        marginTop: 20,
        fontFamily: 'Poppins_400Regular'
    },

    ProductTitle: {
        color: '#455A64',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 15
    },

    ProductPriceLabel : {
        color: '#9330AC',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 15,
    },
    ProductPriceValue : {
        color: '#978D9C',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 15,
    },

    ProductDescription : {
        marginTop: 20,
        marginLeft:15,
        width: Dimensions.get('screen').width -60,
        fontFamily: 'Poppins_300Light',
        fontSize: 15,
        height: 60,
    },

    LinkButton:{
        width: 40,
        height: 36,
        backgroundColor: '#F782EC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,

    },

    LinkView :{
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: '#F782EC',
        height:36,
        width:40,
        alignItems: 'center',
        position: 'absolute',
        marginLeft: Dimensions.get('screen').width - Dimensions.get('screen').width * 0.730555556
    },

    LinkText:{
        width: 65,
        height:30,
        fontSize: 10,
        fontFamily: 'Poppins_600SemiBold',
        color: '#9330AC',
        position: 'absolute',
        marginLeft: Dimensions.get('screen').width -340
    },

    EditButton: {
        width:31,
        height:31,
        borderRadius:50,
        backgroundColor: '#9553A0',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginLeft:Dimensions.get('screen').width - Dimensions.get('screen').width * 0.180555556
        
    },

    InfoButton:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        flexDirection: 'row',
        position: 'absolute',
        marginLeft: Dimensions.get('screen').width - (Dimensions.get('screen').width * 0.383333333)
    },

    InfoText:{
        width:65,
        fontSize:10,
        fontFamily: 'Poppins_600SemiBold',
        color:'#9330AC',
        marginRight:3
    },

    InfoView:{
        backgroundColor:'#F782EC',
        height:40,
        width:40,
        alignItems:'center',
        justifyContent: 'center',
        borderTopRightRadius:20,
        borderBottomLeftRadius:20
    }

})

export default styles