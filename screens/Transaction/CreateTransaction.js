import React, { useState, useEffect } from "react";
import {
    Button,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    Picker
} from "react-native";

import firebase from "../../utils/firebase";


export default function CreateTransaction({ navigation }) {

    const [selectedValue, setSelectedValue] = useState("java")

    const [workersCod, setWorkersCod] = useState([]);
    const [permissionsCod, setPermissionsCod] = useState([]);

    const initalState = {
        codWorker: "",
        horas: "",
        codPermiss: "",
        estado: "A",
    };

    const [state, setState] = useState(initalState);

    const handleChangeText = (value, name) => {
        setState({ ...state, [name]: value });
    };

    const saveNewTransaction = async () => {
        if (state.nombre === "") {
            alert("porfavor coloque un nombre");
        } else {

            try {
                await firebase.db.collection("transactions").add({
                    codWorker: state.codWorker,
                    horas: state.horas,
                    codPermiss: state.codPermiss,
                    estado: state.estado,
                });

                navigation.navigate("TransactionList");
            } catch (error) {
                console.log(error)
            }
        }
    };


    useEffect(() => {
        firebase.db.collection("workers").onSnapshot((querySnapshot) => {
            const workersCod = [];
            querySnapshot.docs.forEach((doc) => {
                const { nombre } = doc.data();
                workersCod.push({
                    nombre,
                });
            });
            setWorkersCod(workersCod);
        });
    }, []);

    useEffect(() => {
        firebase.db.collection("permissions").onSnapshot((querySnapshot) => {
            const permissionsCod = [];
            querySnapshot.docs.forEach((doc) => {
                const { nombre } = doc.data();
                permissionsCod.push({
                    nombre,
                });
            });
            setPermissionsCod(permissionsCod);
        });
    }, []);

    console.log(workersCod);

    return (
        <ScrollView style={styles.container}>

            {/* Email Input */}
            <View style={styles.inputGroup}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, }}
                    onValueChange={(value) => handleChangeText(value, "codWorker")}
                >

                    {workersCod.map((cod) => {
                        return (
                            <Picker.Item label={cod.nombre} value={cod.nombre} />
                        )
                    })}

                </Picker>
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, }}
                    onValueChange={(value) => handleChangeText(value, "codPermiss")}
                >
                    {permissionsCod.map((cod) => {
                        return (
                            <Picker.Item label={cod.nombre} value={cod.nombre} />
                        )
                    })}
                </Picker>
            </View>


            {/* Email Input */}
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Horas"
                    keyboardType="phone-pad"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(value) => handleChangeText(value, "horas")}
                    value={state.horas}
                />
            </View>




            <View style={styles.button}>
                <Button title="Guardar Transaccion" onPress={() => saveNewTransaction()} />
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


