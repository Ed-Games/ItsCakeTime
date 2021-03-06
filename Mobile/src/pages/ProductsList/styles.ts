import { Poppins_300Light } from "@expo-google-fonts/poppins"
import { Dimensions, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#F5F5F5',
        flex: 1,
        alignItems: 'center',
    },

    waves : {
        width: Dimensions.get('screen').width,
        flex: 1,
        height: 255,
        alignItems: 'center',
    },

    title:{
        fontSize: 20,
        fontFamily: 'Archivo_600SemiBold',
        color: '#FFF',
        marginLeft: 50,
        marginRight: 50
    },

    iconButton: {
        width: 27,
        height: 24,
        borderRadius: 5,
        alignItems: 'center',
    },


    filterText: {
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Poppins_300Light',
        marginTop: 31
    },

    FilterView : {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    FilterViewText : {
        color: '#FFF',
        fontSize:15,
        fontFamily: 'Poppins_300Light',
    },

    FilterViewInput : {
        backgroundColor: '#F5F5F5',
        width: 62,
        height: 23,
        borderRadius: 5,
        marginLeft: 10,
        color: '#455A64',
        marginRight: 10,
        fontSize: 15,
        fontFamily: 'Poppins_300Light'
    },
    FilterViewSelect : {
        backgroundColor: '#F5F5F5',
        width: 110,
        height: 20,
        color: '#455A64',
        fontSize: 15,
        fontFamily: 'Poppins_300Light',
        marginLeft: 5,
    },

    pickerView: {
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        width: 130,
        height: 23,
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    selectImg : {
        marginTop: 3
    },

    buttonsContainer: {
        flexDirection:'row',
        
    },

    filterButton:{
        backgroundColor: '#F782EC',

        height:27,
        width:120,
        marginTop:18,
        borderRadius: 5,

        flexDirection:'row',
        alignItems: 'center',
        alignContent:'space-between',
        justifyContent:'center',
        marginHorizontal:10,
    },

    ProductsList : {
        width: Dimensions.get('screen').width,
        alignItems: 'center',
        justifyContent:'center'
    },

    Frame : {
        width: Dimensions.get('screen').width, 
        flex: 1,
    },

    ListView: {
        backgroundColor: '#000'
    },

    FlexRowView : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 67
    },

    notFoundImg : {
        width: 230,
        height: 230,
    },

    notFoundText : {
        fontFamily: 'Poppins_500Medium_Italic',
        fontSize: 18,
        lineHeight: 27,
        textAlign: 'center',
        color: '#BA68C8',
        width: 223
    },

    

})

export default styles