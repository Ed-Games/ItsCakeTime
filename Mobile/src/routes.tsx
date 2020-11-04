import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator} from '@react-navigation/drawer';
import Landing from './pages/Landing/Landing'
import Profile from './pages/Profile/Profile'
import Search from './pages/SearchProfiles/Search';
import ProductScreen from './components/Screens/RouteScreens';




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
            <Drawer.Navigator  initialRouteName="Landing">
                <Drawer.Screen name="Landing" component={Landing} />
                <Drawer.Screen name="ProductsList" component={ProductScreen} />
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="ProfileProducts" component={Profile} />
                <Drawer.Screen name="Search Profiles" component={Search} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}