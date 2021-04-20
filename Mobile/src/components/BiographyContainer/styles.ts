import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    InfoView : {
        backgroundColor: '#FFF',
        width: 328,
        borderRadius: 20,
        marginTop: 10,
        paddingVertical:10
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

    FlexRowView : {
        flexDirection: 'row',
        justifyContent: 'space-between',
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

    ListButton:{
        backgroundColor: '#F782EC',
        width: 143,
        height:36,
        borderRadius: 10,
        marginLeft: 13,
        marginTop: 27,
    },
})

export default styles