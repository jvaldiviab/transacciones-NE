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

export default function DetailTransaction({ navigation, route }) {


    const initialState = {
        id: "",
        codPermiss: "",
        codWorker: "",
        horas: "",
        estado: "",
    };

    const [transaction, setTransaction] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleTextChange = (value, prop) => {
        setTransaction({ ...transaction, [prop]: value });
    };

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection("transactions").doc(id);
        const doc = await dbRef.get();
        const transaction = doc.data();
        setTransaction({ ...transaction, id: doc.id });
        setLoading(false);

        console.log(transaction)
    };
    const deleteUser = async () => {
        setLoading(true)
        const dbRef = firebase.db
            .collection("transactions")
            .doc(route.params.transactionId);
        await dbRef.delete();
        setLoading(false)
        navigation.navigate("TransactionList");
    };

    const openConfirmationAlert = () => {
        Alert.alert(
            "Eliminar transaccion?",
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
        console.log(transaction)
        const transactionRef = firebase.db.collection("transactions").doc(transaction.id);
        await transactionRef.set({
            codWorker: transaction.codWorker,
            codPermiss: transaction.codPermiss,
            estado: transaction.estado,
            horas: transaction.horas,
        });
        setTransaction(initialState);
        navigation.navigate("TransactionList");
    };

    useEffect(() => {
        getUserById(route.params.transactionId);
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
                    value={transaction.codWorker}
                    onChangeText={(value) => handleTextChange(value, "codigo")}
                />
            </View>
            <View>
                <TextInput
                    autoCompleteType="email"
                    placeholder="Nombre"
                    style={styles.inputGroup}
                    value={transaction.codPermiss}
                    onChangeText={(value) => handleTextChange(value, "nombre")}
                />
            </View>
            <View>
                <TextInput
                    autoCompleteType="email"
                    placeholder="Nombre"
                    style={styles.inputGroup}
                    value={transaction.horas}
                    onChangeText={(value) => handleTextChange(value, "horas")}
                />
            </View>
            <View style={styles.btn}>
                <Button
                    title="ELIMINAR"
                    onPress={() => { transaction.estado = "*"; updateUser() }}
                    color="#EB0000"
                />
            </View>
            <View style={styles.btn}>
                <Button title="Modificar" onPress={() => updateUser()} color="#19AC52" />
            </View>
            <View style={styles.btn}>
                <Button
                    title="INACTIVAR"
                    onPress={() => { transaction.estado = "I"; updateUser() }}
                    color="#979797"
                />
            </View>
            <View style={styles.btn}>
                <Button
                    title="REACTIVAR"
                    onPress={() => { transaction.estado = "A"; updateUser() }}
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


