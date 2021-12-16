import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import WorkersStack from './navigations/WorkersStack';
import PermissionsStack from './navigations/PermissionsStack';
import TransactionStack from './navigations/TransactionStack';
import { LogBox } from 'react-native'

LogBox.ignoreAllLogs()

const Drawer = createDrawerNavigator();

function App() {
	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="Home">
				<Drawer.Screen name="Home" component={Home} />
				<Drawer.Screen name="Trabajadores" component={WorkersStack} />
				<Drawer.Screen name="Permisos" component={PermissionsStack} />
				<Drawer.Screen name="Transacciones de permisos" component={TransactionStack} />
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