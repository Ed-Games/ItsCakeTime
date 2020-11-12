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
        width:260,
        height:242,
        marginBottom: 27
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
})

export default styles