import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({

    ModalView: {
        width: Dimensions.get('screen').width - (Dimensions.get('screen').width * 0.1),
        backgroundColor: '#FFF',
        alignSelf: 'center',
        borderRadius:10,
        padding: 10,
        
    },

    ModalTitleText:{
        marginHorizontal:10,
        marginVertical:10,
        color: '#9553A0',
        fontSize: 25,
        fontFamily: 'Archivo_700Bold',
    },

    ModalText:{
        color:'#455A64',
        fontSize: 15,
        fontFamily: 'Poppins_500Medium'
    },

    ModalButton:{
        height:40,
        justifyContent: 'center',
        padding: 5,
    },

    ModalButtonText:{
        fontFamily:'Poppins_500Medium',
        fontSize: 18,
        color: '#9553A0',
        alignSelf: 'center',
    }
})

export default styles