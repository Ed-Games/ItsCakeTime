import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },

    Waves : {
        width: Dimensions.get('screen').width,
        flex: 1,
        height: 210,
        alignItems: 'center',
    },

    ProductsList : {
        marginRight: 10,
        width: Dimensions.get('screen').width,
        marginLeft:10,
        alignItems: 'center',
    },

    plusButton:{
        marginTop: -300,
        backgroundColor: '#9553A0',
        alignSelf: 'flex-end',
        width: 60,
        height: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,

    }
})

export default styles