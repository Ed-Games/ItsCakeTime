import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator} from '@react-navigation/drawer';


import Landing from './pages/Landing/Landing'
import ProductScreen from './components/Screens/RouteScreens';
import ProfileScreen from './components/Screens/ProfileScreen';
import SearchScreen from './components/Screens/SearchScreen';

import DrawerContent from './components/DrawerContent/DrawerContent'
import ProfileProductsScreen from './components/Screens/ProfileProductsScreen';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout'
import ResetPasswd from './pages/ResetPasswd/ResetPasswd';
import CreateNewPasswd from './pages/CreateNewPasswd/CreateNewPasswd';



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
                <Drawer.Screen name="Register" component={Register} />
                <Drawer.Screen name="Login" component={Login} />
                <Drawer.Screen name="Logout" component={Logout} />
                <Drawer.Screen name="ResetPasswd" component={ResetPasswd} />
                <Drawer.Screen name="CreateNewPasswd" component={CreateNewPasswd} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}