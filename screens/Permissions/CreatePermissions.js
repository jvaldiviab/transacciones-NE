import React, { useState } from "react";
import {
    Button,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
} from "react-native";

import firebase from "../../utils/firebase";


export default function CreatePermissions({ navigation }) {

    const initalState = {
        codigo: "",
        nombre: "",
        estado: "A",
    };

    const [state, setState] = useState(initalState);

    const handleChangeText = (value, name) => {
        setState({ ...state, [name]: value });
    };

    const saveNewPermission = async () => {
        if (state.nombre === "") {
            alert("porfavor coloque un nombre");
        } else {

            try {
                await firebase.db.collection("permissions").add({
                    codigo: state.codigo,
                    nombre: state.nombre,
                    estado: state.estado,
                });

                navigation.navigate("PermissionList");
            } catch (error) {
                console.log(error)
            }
        }
    };
    return (
        <ScrollView style={styles.container}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Codigo"
                    onChangeText={(value) => handleChangeText(value, "codigo")}
                    value={state.codigo}
                />
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Nombre"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(value) => handleChangeText(value, "nombre")}
                    value={state.nombre}
                />
            </View>

            {/* Input */}
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Estado"
                    onChangeText={(value) => handleChangeText(value, "estado")}
                    value={state.estado}
                />
            </View>

            <View style={styles.button}>
                <Button title="Guardar Permiso" onPress={() => saveNewPermission()} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
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
});


