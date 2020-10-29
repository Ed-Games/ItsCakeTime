import { Poppins_300Light } from "@expo-google-fonts/poppins"
import { Dimensions } from "react-native"

const styles = {
    container : {
        backgroundColor: '#9553A0',
        flex: 1,
        alignItems: 'center',
    },

    title:{
        marginTop: 67,
        fontSize: 20,
        fontFamily: 'Archivo600_SemiBold',
        color: '#FFF'
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
        marginTop: 10
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

    filterButton:{
        backgroundColor: '#F782EC',
        width: 64,
        height:27,
        marginTop:18,
        borderRadius: 5,
        alignItems: 'center',
    },

    ProductsList : {
        marginRight: 10,
        width: Dimensions.get('screen').width,
        flex: 1,
        marginLeft:10,
        alignItems: 'center',
    },

    

}

export default styles