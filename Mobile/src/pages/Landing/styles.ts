import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#9553A0',
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',

    },

    title: {
        marginTop: 40,
        marginBottom: 10,
        fontSize: 20,
        fontFamily: 'Archivo_600SemiBold',
        color: '#FFF'
        
    },

    logo : {
        marginBottom: 10
    },

    contentText : {
        fontFamily: 'Poppins_500Medium_Italic',
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10
    },

    actionText : {
        fontFamily: 'Poppins_500Medium_Italic',
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    },

    buttonsView : {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    clientButton: {
        backgroundColor: '#F783EC',
        borderRadius: 10,
        width: 133,
        height: 62,
        marginRight: 10,
        marginTop: 50
    },

    ButtonText : {
        fontFamily: 'Poppins_500Medium_Italic',
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center',
    },

    bakerButton: {
        backgroundColor: '#BC71CF',
        borderRadius: 10,
        width: 133,
        height: 62,
        marginLeft: 10,
        marginTop: 50
    },
})

export default styles