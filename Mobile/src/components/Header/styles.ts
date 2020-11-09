import { Dimensions, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    title:{
        fontSize: 20,
        fontFamily: 'Archivo600SemiBold',
        color: '#FFF',
        width: Dimensions.get('screen').width -30
    },

    iconButton: {
        width: 27,
        height: 24,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 70
    },

    FlexRowView : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 67,
        alignItems: 'center',
        textAlign: 'center',
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