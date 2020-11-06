import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    title:{
        fontSize: 20,
        fontFamily: 'Archivo600_SemiBold',
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

    FlexRowView : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 67
    },

    Avatar : {
        marginLeft:101,
        marginRight: 98,
        marginTop: 18,
        width:96,
        height:96,
        borderRadius: 50
    }
})

export default styles