import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator} from '@react-navigation/drawer'


import Landing from './pages/Landing/Landing'
import SearchScreen from './components/Screens/SearchScreen'

import DrawerContent from './components/DrawerContent/DrawerContent'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Logout from './pages/Logout/Logout'
import ResetPasswd from './pages/ResetPasswd/ResetPasswd'
import CreateNewPasswd from './pages/CreateNewPasswd/CreateNewPasswd'
import UpdateProfile from './pages/UpdateProfile/UpdateProfile'
import ProductRegister from './pages/ProductRegister/ProductRegister'
import ViewYourProducts from './pages/ViewYourProducts/ViewYourProducts'
import EditProduct from './pages/EditProduct/EditProduct'
import * as Linking from 'expo-linking'
import Profile from './pages/Profile/Profile'
import ViewProfileProducts from './pages/ViewProfileProducts/ViewProfileProducts'
import ProductsList from './pages/ProductsList/ProductsList'
import {navigationRef} from './services/RootNavigation'

const Drawer = createDrawerNavigator()
const prefix = Linking.createURL('/');



export default function Routes() {

    const config= {
        screens :{
            CreateNewPasswd :{
                path: 'CreateNewPasswd/:token/:email',
                parse: {
                    token: (token : string) =>  `${token}`,
                    email: (email : string) =>  `${email}`,
                },

                stringify:{
                    token: (token : string) => token.replace(/^CreateNewPasswd/,''),
                    email: (email : string) => email.replace(/^CreateNewPasswd/,'')
                }
            }
        }
    }

    const linking = {
        prefixes: [prefix],
        config
      }

      console.log('url: ',linking)

    return(
        <NavigationContainer ref={navigationRef} linking={linking}>
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}  initialRouteName="Landing">
                <Drawer.Screen name="Landing" component={Landing} />
                <Drawer.Screen name="ProductList" component={ProductsList} />
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="Details" component={Profile} />
                <Drawer.Screen name="ViewProfileProducts" component={ViewProfileProducts} />
                <Drawer.Screen name="Search Profiles" component={SearchScreen} />
                <Drawer.Screen name="Register" component={Register} />
                <Drawer.Screen name="Login" component={Login} />
                <Drawer.Screen name="Logout" component={Logout} />
                <Drawer.Screen name="ResetPasswd" component={ResetPasswd} />
                <Drawer.Screen name="CreateNewPasswd" component={CreateNewPasswd} />
                <Drawer.Screen name="UpdateProfile" component={UpdateProfile} />
                <Drawer.Screen name="ViewYourProducts" component={ViewYourProducts} />
                <Drawer.Screen name="ProductRegister" component={ProductRegister} />
                <Drawer.Screen name="EditProduct" component={EditProduct} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}