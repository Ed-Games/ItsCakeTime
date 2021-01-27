import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({

    ModalView: {
        width: Dimensions.get('screen').width - (Dimensions.get('screen').width * 0.1),
        backgroundColor: '#FFF',
        alignSelf: 'center',
        borderRadius:10
    },

    ModalTitleText:{
        marginHorizontal:10,
        marginVertical:10,
        color: '#9553A0',
        fontSize: 25,
        fontFamily: 'Archivo_700Bold',
    },

    ModalText:{
        marginHorizontal: 10,
        color:'#455A64',
        fontSize: 15,
        fontFamily: 'Poppins_500Medium'
    },

    ModalButton:{
        alignSelf: 'flex-end',
        marginRight:20,
        marginTop: 40,
        height:40,
        justifyContent: 'center',
    },

    ModalButtonText:{
        fontFamily:'Poppins_500Medium',
        fontSize: 18,
        color: '#9553A0',
        alignSelf: 'center',
    }
})

export default styles