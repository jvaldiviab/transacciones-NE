import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


// Navigation

import { createStackNavigator } from "@react-navigation/stack";
import PermissionList from '../screens/Permissions/PermissionList';
import DetailPermissions from '../screens/Permissions/DetailPermissions';
import CreatePermissions from '../screens/Permissions/CreatePermissions';
import SearchPermission from '../screens/Permissions/SearchPermission';

const Stack = createStackNavigator();


export default function PermissionsStack({ navigation }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#3f3f3f",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen
                name="PermissionList"
                component={PermissionList}
                options={{ title: "Lista de Permisos" }}
            />
            <Stack.Screen
                name="DetailPermissions"
                component={DetailPermissions}
                options={{ title: "Detalle de permisos" }}
            />
            <Stack.Screen
                name="CreatePermissions"
                component={CreatePermissions}
                options={{ title: "Crear nuevo permiso" }}
            />
            <Stack.Screen
                name="SearchPermission"
                component={SearchPermission}
                options={{ title: "Buscar permiso por codigo" }}
            />

        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
