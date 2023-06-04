import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        flex: 1,
    },

    ButtonLink:{
        marginTop: 20,
        marginBottom: 20,
        height: 24,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        flexDirection: 'row',
    },

    LinkText : {
        color: '#9330AC',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: 10
    },

    LineSpace : {
        borderColor: '#9330AC',
        height: 1,
        width: 224,
        backgroundColor: '#9330AC'
    },

    BottomContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        width: 255
    },

    SignOutButton:{
        flexDirection: 'row',
        marginLeft: 25,
        marginBottom: 25
    },

    SignOutText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        lineHeight: 24,
        color: '#9330AC',
        marginLeft: 10
    },

    ImageView: {
        height: 81,
        marginTop: 30,
        marginBottom: -50,
        flexDirection: 'row',
    },

    Avatar:{
        width:81,
        height:81, 
        borderRadius: 50
    },

    AvatarNameText:{
        alignSelf: 'center',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        lineHeight:24,
        width:139,
        marginLeft:10,
        color: '#9330AC',
    }
})

export default styles