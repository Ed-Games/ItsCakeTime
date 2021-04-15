import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#9553A0',
        flex: 1,
    },

    Image:{
        width:242,
        height:242,
    },

    passwordText: {
        color: '#FFF',
        fontFamily: 'Poppins_500Medium_Italic',
        textShadowColor: '#F782EC',
        textShadowRadius: 5,
        textDecorationColor: '#F782EC',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        alignSelf: 'flex-end',
    },

    submitButton:{
        width: Dimensions.get('screen').width - 120,
        marginTop: 28,
        backgroundColor: '#F783EC',
        borderRadius: 10,
        justifyContent: 'center',
        paddingVertical: 6,
    },

    submitButtonText: {
        fontFamily: 'Poppins_500Medium_Italic',
        fontSize: 18,
        color: '#FFF',
        alignSelf: 'center',
    },

    GoToRegisterButton:{
        alignItems: 'center',
        justifyContent: 'center',
    },

    GoToRegisterText:{
        fontFamily: 'Poppins_500Medium_Italic',
        fontSize:13,
        color: '#FFF',
        lineHeight:15,
    },

    GoToRegisterTextLink:{
        fontFamily: 'Poppins_500Medium_Italic',
        fontSize:13,
        color: '#F782EC',
        lineHeight:15,
        textDecorationLine: 'underline'
    },

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