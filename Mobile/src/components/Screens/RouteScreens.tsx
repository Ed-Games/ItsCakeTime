import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import ProductsList from '../../pages/ProductsList/ProductsList';
import { useNavigation } from '@react-navigation/native';


const Stack = createStackNavigator()

export default function ProductScreen({navigation}) {

    function handleNavigateToPreviousPage(){
        navigation.goBack()
    }

    return(
        <Stack.Navigator>
             <Stack.Screen name="ProductList" component={ProductsList} options={{
                headerStyle: header,
                headerTitleStyle: title,
                title: "Produtos disponíveis",
                headerRight: () => (
                    <Feather
                    name="menu"
                    size={25}
                    color="#FFF"
                    onPress={() => navigation.openDrawer()}
                  />
                ),
                headerLeft: ()=> (
                    <Feather  
                    name="arrow-left" 
                    size={24} 
                    color='#FFF'
                    onPress={handleNavigateToPreviousPage} />
                )
          }} />
        </Stack.Navigator>
    )
}

const header = {
    backgroundColor: '#9553A0',
    elevation: 0,
    shadowOpacity: 0,
}

const title = {
    fontSize: 20,
    fontFamily: 'Archivo600_SemiBold',
    color: '#FFF',
    marginLeft: 14,
    marginRight: 50,
    width: 315,
}