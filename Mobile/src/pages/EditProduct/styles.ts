import { Dimensions, StyleSheet } from "react-native";

const styles= StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        justifyContent: 'space-evenly'
    },

    waves : {
        width: Dimensions.get('screen').width,
        height:210,
        marginTop: -60
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
        width:75,
        height:75,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10,
        marginBottom:10
    },
    CloseButton:{
        backgroundColor: '#FF0909',
        width:20,
        height:20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:5,
        position: 'absolute',
        alignSelf:'flex-end'
    },

    UploadedImage:{
        width:75,
        height:75,
        borderRadius:10,
        marginBottom: 10,
        marginRight:5, 
        alignItems: 'flex-start',
    },

    EditUploadedImage:{
        width:100,
        height:100,
        borderRadius:10,
        marginBottom: 10,
        marginRight:5, 
        alignItems: 'flex-start',
    },

    actionButton:{
        width:84,
        height:29,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:12
    },

    actionButtonText: {
        color: '#FFF',
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
        lineHeight:22.5

    }
})

export default styles