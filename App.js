import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import WorkersStack from './navigations/WorkersStack';
import AddPermission from './screens/Permissions/PermissionList';
import AddTransaction from './screens/AddTransaction';
import PermissionsStack from './navigations/PermissionsStack';


const Drawer = createDrawerNavigator();

function App() {
	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="Home">
				<Drawer.Screen name="Home" component={Home} />
				<Drawer.Screen name="Trabajadores" component={WorkersStack} />
				<Drawer.Screen name="Permisos" component={PermissionsStack} />
				<Drawer.Screen name="Transacción de permisos" component={AddTransaction} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default App;