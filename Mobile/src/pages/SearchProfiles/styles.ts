import { Dimensions } from "react-native"

const styles = {
    container : {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },

    Waves : {
        width: Dimensions.get('screen').width,
        height:300
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
    }
}

export default styles