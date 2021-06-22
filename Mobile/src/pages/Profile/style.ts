import { Dimensions, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },

    Waves : {
        width: Dimensions.get('screen').width,
        height:216,
        alignItems: 'center',
    },

    Name :{
        fontSize: 20,
        fontFamily: 'Archivo_600SemiBold',
        color: '#FFF',
        marginLeft: 50,
        marginRight: 50,
        marginTop: 10,
        textAlign: 'center',
    },

    ProductsList : {
        marginRight: 10,
        width: Dimensions.get('screen').width,
        marginLeft:10,
        alignItems: 'center',
    },

    UpdateImageView: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        width: 180
    },

    buttonsView: {
        width:50,
        alignSelf:'flex-end',
    },

    Avatar : {
        marginTop: 18,
        width:96,
        height:96,
        borderRadius: 50,
        alignSelf:'center'
    },

    EditButton:{
        backgroundColor: '#F159E2',
        width:31,
        height:31,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginRight:90,
        marginLeft: -120
    },

    Savebutton:{
        backgroundColor: '#2BAF80',
        width:50,
        height:50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    Cancelbutton:{
        backgroundColor: '#FF0909',
        width:50,
        height:50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },

    SavebuttonText:{
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Poppins_500Medium',

    },

    ScrollView: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom:210,
        marginTop: -60
    }
})

export default styles