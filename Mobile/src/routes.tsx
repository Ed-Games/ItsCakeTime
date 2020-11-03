import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Landing from './pages/Landing/Landing'
import ProductsList from './pages/ProductsList/ProductsList'
import Profile from './pages/Profile/Profile'


const {Navigator, Screen} = createStackNavigator()
const Drawer = createDrawerNavigator()

export default function Routes() {
    return(
        <NavigationContainer>
            {/*<Navigator screenOptions={{
                headerShown: false
            }}>
                <Screen name="Landing" component={Landing} />
                <Screen name="ProductsList" component={ProductsList} />
                <Screen name="Profile" component={Profile} />
                <Screen name="ProfileProducts" component={Profile} />
            </Navigator>*/}
            <Drawer.Navigator initialRouteName="Landing">
                <Drawer.Screen name="Landing" component={Landing} />
                <Drawer.Screen name="ProductsList" component={ProductsList} />
                <Drawer.Screen      
                name="Profile" component={Profile} />
                <Drawer.Screen name="ProfileProducts" component={Profile} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}