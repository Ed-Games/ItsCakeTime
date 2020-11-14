import { Dimensions, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },

    FlexRowView : {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    Waves : {
        width: Dimensions.get('screen').width,
        height:210,
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

    InfoView : {
        backgroundColor: '#FFF',
        width: 328,
        height: 381,
        borderRadius: 20,
        marginTop: 10,
    },

    TopicText :{
        margin: 14,
        fontSize: 16,
        color: '#455A64',
        width: 160,
        height:24,
        lineHeight: 24,
        fontFamily: 'Poppins_600SemiBold'
    },

    ContentText: {
        marginLeft: 14,
        marginRight: 9,
        fontSize:12,
        fontFamily: 'Poppins_300Light'
    },

    ButtonsView : {
        flexDirection: 'row',
        marginTop: -35
    },

    ListButton:{
        backgroundColor: '#F782EC',
        width: 143,
        height:36,
        borderRadius: 10,
        marginLeft: 13,
        marginTop: 27,
    },

    ButtonText : {
        color: '#FFF',
        fontFamily: 'Poppins_600SemiBold',
        fontSize:10,
        marginTop: 10,
        marginRight: 20,
        width:102,
        marginLeft: 10

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
    }
})

export default styles