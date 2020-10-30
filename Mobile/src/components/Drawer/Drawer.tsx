import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function GoToLanding({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Landing')}
        title="Go to Landing"
      />
    </View>
  );
}

function GoToProductList({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.navigation('ProductList')} title="Go to ProductList" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function Menu() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={GoToLanding} />
        <Drawer.Screen name="Notifications" component={GoToProductList} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}