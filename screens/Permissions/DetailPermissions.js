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

export default function DetailPermissions({ navigation, route }) {

    console.log("asdasdad-----------------" + route);

    const initialState = {
        id: "",
        codigo: "",
        nombre: "",
        estado: "",
    };

    const [permission, setPermission] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleTextChange = (value, prop) => {
        setPermission({ ...permission, [prop]: value });
    };

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection("permissions").doc(id);
        const doc = await dbRef.get();
        const permission = doc.data();
        setPermission({ ...permission, id: doc.id });
        setLoading(false);
    };
    const deleteUser = async () => {
        setLoading(true)
        const dbRef = firebase.db
            .collection("permissions")
            .doc(route.params.permissionId);
        await dbRef.delete();
        setLoading(false)
        navigation.navigate("PermissionList");
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
        const workerRef = firebase.db.collection("permissions").doc(permission.id);
        await workerRef.set({
            codigo: permission.codigo,
            nombre: permission.nombre,
            estado: permission.estado,
        });
        setPermission(initialState);
        navigation.navigate("PermissionList");
    };

    useEffect(() => {
        getUserById(route.params.permissionId);
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
                    value={permission.codigo}
                    onChangeText={(value) => handleTextChange(value, "codigo")}
                />
            </View>
            <View>
                <TextInput
                    autoCompleteType="email"
                    placeholder="Nombre"
                    style={styles.inputGroup}
                    value={permission.nombre}
                    onChangeText={(value) => handleTextChange(value, "nombre")}
                />
            </View>
            <View>
                <TextInput
                    placeholder="Estado"
                    autoCompleteType="tel"
                    style={styles.inputGroup}
                    value={permission.estado}
                    onChangeText={(value) => handleTextChange(value, "estado")}
                />
            </View>
            <View style={styles.btn}>
                <Button
                    title="Delete"
                    onPress={() => openConfirmationAlert()}
                    color="#E37399"
                />
            </View>
            <View>
                <Button title="Update" onPress={() => updateUser()} color="#19AC52" />
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


