import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#FFFFFF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
    },

    imageView: {
        width: Dimensions.get('screen').width,
        height:504,
    },

    confirmButton:{
        width:134,
        height:36,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        borderRadius: 10
    },

    confirmButtonText:{
        fontFamily: 'Poppins_500Medium_Italic',
        color: '#FFF',
        fontSize: 18,
        lineHeight: 27
    }
})

export default styles