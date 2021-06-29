import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 30,
    },
    Waves : {
        width: Dimensions.get('screen').width,
        flex: 1,
        height: 160,
        alignItems: 'center',
    },

    FormView:{
        backgroundColor: '#F5F5F5',
        width: Dimensions.get('screen').width ,
        height: 536,
        alignItems: 'center',
        paddingVertical: 30

    },

    imageView : {
        flexDirection: 'row-reverse', 
        alignSelf:'center',
        width: Dimensions.get('screen').width - 120,
        justifyContent:'flex-end'
    },

    SubmitButton: {
        width:  Dimensions.get('screen').width -120,
        height:40,
        backgroundColor: '#9553A0',
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    SubmitButtonText:{
        color: '#FFF',
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
        lineHeight: 22.5
    },

    CategoryInput:{
        width:  Dimensions.get('screen').width -140,
        height:35,
        backgroundColor: '#E6E6E6',
        borderRadius: 10
    },

    pickerView: {
       height:45,
       alignItems: 'center',
       justifyContent: 'center',
       width:  Dimensions.get('screen').width -120,
       borderRadius:10,
       backgroundColor: '#E6E6E6',
       marginBottom:10,
       marginTop:4,
       flexDirection: 'row',

    },

    InputText:{
        color: '#455A64',
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
        marginBottom: 4,
        alignSelf: 'flex-start',
        marginLeft: Dimensions.get('screen').width - (Dimensions.get('screen').width -60),

    },

    selectImg : {
        marginTop: 3
    },

    UploadButton:{
        backgroundColor: '#E6E6E6',
        width:45,
        height:45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10,
        marginBottom:10
    },

    UploadedImage:{
        width:45,
        height:45,
        borderRadius:10,
        marginBottom: 10,
    }
})

export default styles