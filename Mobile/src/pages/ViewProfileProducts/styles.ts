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
        margin: 10
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
        alignItems: 'center'
    }
})

export default styles