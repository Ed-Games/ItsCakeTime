import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },

    waves : {
        width: Dimensions.get('screen').width,
        height:210,
        alignItems: 'center',
    },

    FormView:{
        backgroundColor: '#F5F5F5',
        width: Dimensions.get('screen').width,
        height: 536,
        alignItems: 'center',

    },

    SubmitButton: {
        width:253,
        height: 40,
        backgroundColor: '#9553A0',
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    SubmitButtonText: {
        fontFamily: 'Poppins_500Medium',
        fontSize:15,
        color: '#FFF'
    }

})

export default styles