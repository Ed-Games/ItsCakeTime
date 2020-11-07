import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator} from '@react-navigation/drawer';


import Landing from './pages/Landing/Landing'
import ProductScreen from './components/Screens/RouteScreens';
import ProfileScreen from './components/Screens/ProfileScreen';
import SearchScreen from './components/Screens/SearchScreen';

import DrawerContent from './components/DrawerContent/DrawerContent'
import ProfileProductsScreen from './components/Screens/ProfileProductsScreen';



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
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}  initialRouteName="Landing">
                <Drawer.Screen name="Landing" component={Landing} />
                <Drawer.Screen name="ProductsList" component={ProductScreen} />
                <Drawer.Screen name="Profile" component={ProfileScreen} />
                <Drawer.Screen name="ProfileProducts" component={ProfileProductsScreen} />
                <Drawer.Screen name="Search Profiles" component={SearchScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}