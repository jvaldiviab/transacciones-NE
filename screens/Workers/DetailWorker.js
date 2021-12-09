import React, { useEffect, useState } from "react";
import {
    ScrollView,
    Button,
    View,
    Alert,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../../utils/firebase";

export default function DetailWorker({ navigation, route }) {

    console.log("asdasdad-----------------" + route);

    const initialState = {
        id: "",
        codigo: "",
        nombre: "",
        estado: "",
    };

    const [worker, setWorker] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleTextChange = (value, prop) => {
        setWorker({ ...worker, [prop]: value });
    };

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection("workers").doc(id);
        const doc = await dbRef.get();
        const worker = doc.data();
        setWorker({ ...worker, id: doc.id });
        setLoading(false);
    };
    const deleteUser = async () => {
        setLoading(true)
        const dbRef = firebase.db
            .collection("workers")
            .doc(route.params.workerId);
        await dbRef.delete();
        setLoading(false)
        navigation.navigate("WorkersList");
    };

    const openConfirmationAlert = () => {
        Alert.alert(
            "Eliminar trabajador?",
            "Esta seguro??",
            [
                { text: "Si", onPress: () => deleteUser() },
                { text: "No", onPress: () => console.log("canceled") },
            ],
            {
                cancelable: true,
            }
        );
    };

    const updateUser = async () => {
        console.log(worker)
        const workerRef = firebase.db.collection("workers").doc(worker.id);
        await workerRef.set({
            codigo: worker.codigo,
            nombre: worker.nombre,
            estado: worker.estado,
        });
        setWorker(initialState);
        navigation.navigate("WorkersList");
    };

    useEffect(() => {
        getUserById(route.params.workerId);
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <TextInput
                    placeholder="Codigo"
                    autoCompleteType="username"
                    style={styles.inputGroup}
                    value={worker.codigo}
                    onChangeText={(value) => handleTextChange(value, "codigo")}
                />
            </View>
            <View>
                <TextInput
                    autoCompleteType="email"
                    placeholder="Nombre"
                    style={styles.inputGroup}
                    value={worker.nombre}
                    onChangeText={(value) => handleTextChange(value, "nombre")}
                />
            </View>
            <View style={styles.btn}>
                <Button
                    title="ELIMINAR"
                    onPress={() => { worker.estado = "*"; updateUser() }}
                    color="#EB0000"
                />
            </View>
            <View style={styles.btn}>
                <Button title="Modificar" onPress={() => updateUser()} color="#19AC52" />
            </View>
            <View style={styles.btn}>
                <Button
                    title="INACTIVAR"
                    onPress={() => { worker.estado = "I"; updateUser() }}
                    color="#979797"
                />
            </View>
            <View style={styles.btn}>
                <Button
                    title="REACTIVAR"
                    onPress={() => { worker.estado = "A"; updateUser() }}
                    color="#436EFF"
                />
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    loader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
    btn: {
        marginBottom: 7,
    },
});


