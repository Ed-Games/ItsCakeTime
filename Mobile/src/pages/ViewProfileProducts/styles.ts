import { Dimensions, StyleSheet } from "react-native"


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },

    header: {
        width: '100%',
        flexDirection: 'row',
        height: Dimensions.get('screen').height * 0.1,
        backgroundColor: '#9553A0',
        marginTop: -30
    },

    avatar : {
        width: 50,
        height: 50,
        borderRadius:50,
        marginLeft: 20,
        marginVertical: 10
    },

    title: {
        fontSize: 15,
        fontFamily: 'Archivo_600SemiBold',
        color: '#FFF',
        maxWidth: Dimensions.get('screen').width * 0.8,
        textAlign: 'center',
        margin:20
    },

    products : {
        marginTop: 20,
        alignItems: 'center',
    },

    notFoundImg : {
        width: 230,
        height: 230,
    },

    notFoundText : {
        fontFamily: 'Poppins_500Medium_Italic',
        fontSize: 18,
        lineHeight: 27,
        textAlign: 'center',
        color: '#BA68C8',
        width: 223
    },
})

export default styles