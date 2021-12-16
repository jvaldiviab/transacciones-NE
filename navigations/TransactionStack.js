import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


// Navigation

import { createStackNavigator } from "@react-navigation/stack";
import TransactionList from '../screens/Transaction/TransactionList';
import DetailTransaction from '../screens/Transaction/DetailTransaction';
import CreateTransaction from '../screens/Transaction/CreateTransaction';
import SearchTransaction from '../screens/Transaction/SearchTransaction';

const Stack = createStackNavigator();


export default function TransactionStack({ navigation }) {
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
                name="TransactionList"
                component={TransactionList}
                options={{ title: "Lista de transacciones de permisos" }}
            />
            <Stack.Screen
                name="DetailTransaction"
                component={DetailTransaction}
                options={{ title: "Detalle de transacciones de permisos" }}
            />
            <Stack.Screen
                name="CreateTransaction"
                component={CreateTransaction}
                options={{ title: "Crear una transaccion de permiso" }}
            />
            <Stack.Screen
                name="SearchTransaction"
                component={SearchTransaction}
                options={{ title: "Busqueda por codigo" }}
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
