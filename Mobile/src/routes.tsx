import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Landing from './pages/Landing/Landing'
import ProductsList from './pages/ProductsList/ProductsList'

const {Navigator, Screen} = createStackNavigator()

export default function Routes() {
    return(
        <NavigationContainer>
            <Navigator screenOptions={{
                headerShown: false
            }}>
                <Screen name="Landing" component={Landing} />
                <Screen name="ProductsList" component={ProductsList} />
            </Navigator>
        </NavigationContainer>
    )
}