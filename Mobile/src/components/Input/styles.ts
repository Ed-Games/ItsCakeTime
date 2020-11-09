import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    FormInputView:{
        width: Dimensions.get('screen').width -120,
        height: 45,
        backgroundColor: '#E6E6E6',
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 15,
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
        alignSelf: 'flex-start',
        marginLeft: Dimensions.get('screen').width - (Dimensions.get('screen').width -60)

    }
})

export default styles