import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent:'space-evenly',
        marginTop:30,
    },

    waves : {
        width: Dimensions.get('screen').width,
        height:240,
        alignItems: 'center',
    },

    FormView:{
        backgroundColor: '#F5F5F5',
        width: Dimensions.get('screen').width,
        height: 536,
        alignItems: 'center',
        paddingBottom: 30,
        justifyContent:'center'

    },

    SubmitButton: {
        width:253,
        height: 40,
        backgroundColor: '#9553A0',
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    SubmitButtonText: {
        fontFamily: 'Poppins_500Medium',
        fontSize:15,
        color: '#FFF'
    },
    ExcludeButton: {
        width:253,
        height: 40,
        backgroundColor: '#FF0909',
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    ExcludeButtonText: {
        fontFamily: 'Poppins_500Medium',
        fontSize:15,
        color: '#FFF'
    },

    UploadButton: {
        width: Dimensions.get('screen').width -120,
        backgroundColor:'#E6E6E6',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Imagebackground: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginLeft: Dimensions.get('screen').width * 0.166666667,
        marginBottom: 20
    },

    formText: {
        fontFamily:'Poppins_500Medium',
        fontSize: 15,
        color: '#455A64',
        alignSelf:'flex-start',
        marginLeft: Dimensions.get('screen').width * 0.166666667,
    }

})

export default styles