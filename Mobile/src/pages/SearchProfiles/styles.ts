import { Dimensions, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },

    Waves : {
        width: Dimensions.get('screen').width,
        height:210
    },

    search : {
        width: 315,
        height:40,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginLeft: 22,
        marginRight: 22,
        marginTop: 35,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    searchInput:{
        width:215
    },

    searchButtonView:{
        borderTopRightRadius: 10,
        borderBottomRightRadius:10,
        backgroundColor: '#F782EC'
    },

    SearchButton:{
        width: 42,
        height: 40,
        backgroundColor: '#F782EC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },

    Avatar : {
        width:53,
        height:53,
    },

    avatarname:{
        color: '#FF81AE',
        fontSize: 15,
        fontFamily: 'Poppins_500Medium',
        marginLeft: 10
    },

    avatarSpecialtyBold:{
        color: '#9553A0',
        fontSize:12,
        fontFamily: 'Poppins_700Bold',
        lineHeight: 16.34,
        marginLeft:10,
        marginRight: 4
    },

    avatarSpecialty : {
        color: '#9553A0',
        fontSize:12,
        fontFamily: 'Poppins_500Medium',
        lineHeight: 16.34
    },

    AvatarView:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        flexDirection:'row', 
        margin:15
    }
})

export default styles