import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({

    ModalView: {
        height: 180,
        width: Dimensions.get('screen').width -20,
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
        width:40,
        height:40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },

    ModalButtonText:{
        fontFamily:'Poppins_500Medium',
        fontSize: 18,
        color: '#9553A0'
    }
})

export default styles