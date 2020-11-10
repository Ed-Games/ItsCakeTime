import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#9553A0',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'center',

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
        width:134,
        height:36,
        marginTop: 28,
        backgroundColor: '#F783EC',
        borderRadius: 10,
        justifyContent: 'center'
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
    }

})

export default styles