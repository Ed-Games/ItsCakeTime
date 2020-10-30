import { Poppins_600SemiBold } from "@expo-google-fonts/poppins"

const styles = {
    ProductItem : {
        marginTop: 30,
        backgroundColor: '#FFF',
        width: 330,
        height:300,
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
        width: 220,
        fontFamily: 'Poppins_300Light',
        fontSize: 15,
    },

    LinkButton:{
        width: 40,
        height: 36,
        backgroundColor: '#F782EC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20

    },

    LinkView :{
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: '#F782EC',
        Height:36,
        width:40,
        marginTop: -30,
        marginLeft: 42
    },

    LinkText:{
        width: 65,
        height:30,
        fontSize: 10,
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: -30,
        color: '#9330AC'
        
    },

}

export default styles