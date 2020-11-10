import { Dimensions, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    title:{
        fontSize: 20,
        fontFamily: 'Archivo600SemiBold',
        color: '#FFF',
        
    },

    iconButton: {
        width: 27,
        height: 24,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginBottom: 30
    },

    headerView:{
        width: Dimensions.get('screen').width,
        height:80,
        alignItems: 'center',
        marginTop: 30
    }
})

export default styles