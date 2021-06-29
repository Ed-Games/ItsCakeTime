import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#F5F5F5',
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    waves : {
        width: Dimensions.get('screen').width,
        flex: 1,
        height: 160,
        alignItems: 'center',
        zIndex: 5
    },

    FormView:{
        backgroundColor: '#F5F5F5',
        width: Dimensions.get('screen').width - 136,
        height: 536,
        alignItems: 'center',
        bottom:30,

    },
    FormInputView:{
        width: Dimensions.get('screen').width -120,
        height: 45,
        backgroundColor: '#E6E6E6',
        borderRadius: 10,
        justifyContent: 'center',
    },

    Input:{
        color: '#9E9999',
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
        marginTop:10,
        marginLeft:10,
        marginBottom:9,
    },

    InputText:{
        color: '#455A64',
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
        marginBottom: 4,
        alignSelf: 'flex-start'

    },

    submitButton:{
        backgroundColor: '#9553A0',
        width:Dimensions.get('screen').width -120,
        height:40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },

    submitButtonText:{
        color: '#FFF',
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
    }
})

export default styles