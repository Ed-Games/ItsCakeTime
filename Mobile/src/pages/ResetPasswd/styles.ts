import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#FFFFFF',
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',

    },

    MessageText:{
        fontFamily: 'Poppins_500Medium_Italic',
        fontSize: 25,
        width: Dimensions.get('screen').width -10,
        color: '#9553A0',
        marginLeft: 10
    },

    ButtonGoBack:{
        width: 200,
        height: 55,
        backgroundColor: '#9553A0',
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 34
    },

    ButtonGoBackText:{
        fontFamily: 'Poppins_500Medium_Italic',
        fontSize: 18,
        color: '#FFF',
        lineHeight:27
    }
})


export default styles