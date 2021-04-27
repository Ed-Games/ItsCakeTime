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

    Avatar : {
        marginLeft:101,
        marginRight: 98,
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
        width:55,
        height:25,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 55,
        marginRight:90,
        marginLeft: -110,
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