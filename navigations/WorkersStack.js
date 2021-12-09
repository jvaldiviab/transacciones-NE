import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


// Navigation

import { createStackNavigator } from "@react-navigation/stack";
import WorkersList from '../screens/Workers/WorkersList';
import DetailWorker from '../screens/Workers/DetailWorker';
import CreateWorker from '../screens/Workers/CreateWorker';

const Stack = createStackNavigator();


export default function WorkersStack({ navigation }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#621FF7",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen
                name="WorkersList"
                component={WorkersList}
                options={{ title: "Lista de trabajadores" }}
            />
            <Stack.Screen
                name="DetailWorker"
                component={DetailWorker}
                options={{ title: "Detalle de trabajadores" }}
            />
            <Stack.Screen
                name="CreateWorker"
                component={CreateWorker}
                options={{ title: "Crear nuevo trabajador" }}
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