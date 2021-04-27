import { Dimensions, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    title:{
        fontSize: 20,
        fontFamily: 'Archivo_600SemiBold',
        color: '#FFF',
        width: 'auto',
        textAlign: 'center'
        
    },

    iconButton: {
        width: 27,
        height: 24,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginBottom: 30
    },

    headerView:{
        width: Dimensions.get('screen').width,
        flexDirection: 'column',
        paddingTop: 30,
    },

    icons: {
        padding: 5,
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'flex-start',
    },
    
    titleView:{
        alignSelf:'center',
    }
})

export default styles