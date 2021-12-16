import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Icon, Input, Text } from 'react-native-elements'
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../../utils/firebase";

export default function SearchTransaction({ navigation }) {

    const [query, setQuery] = useState("");
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        firebase.db.collection("transactions").onSnapshot((querySnapshot) => {
            const transactions = [];
            querySnapshot.docs.forEach((doc) => {
                const { codPermiss, codWorker, estado, horas } = doc.data();
                transactions.push({
                    id: doc.id,
                    codPermiss,
                    codWorker,
                    estado,
                    horas,
                });
            });
            setTransactions(transactions);
        });
    }, []);

    let searchedTransactions = [];

    if (!query.length >= 1) {
        searchedTransactions = transactions;
    } else {
        searchedTransactions = transactions.filter(transaction => {
            const workerCod = transaction.codWorker.toLowerCase();
            const searchCod = query.toLowerCase();
            return workerCod.includes(searchCod);
        });
    }

    return (
        <View style={styles.viewBody}>

            <Input
                placeholder="Ingrese la palabra a buscar"
                onChange={(e) => setQuery(e.nativeEvent.text)}
            />

            <ScrollView>

                {searchedTransactions.map((transactions) => {
                    return (
                        <ListItem
                            key={transactions.id}
                            bottomDivider
                            onPress={() => {
                                navigation.navigate("Detailtransactions", {
                                    transactionsId: transactions.id,
                                });
                            }}
                        >
                            <ListItem.Chevron />
                            <Avatar
                                source={{
                                    uri:
                                        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                                }}
                                rounded
                            />
                            <ListItem.Content>
                                <ListItem.Title>Codigo del trabajador: {transactions.codWorker}</ListItem.Title>
                                <ListItem.Subtitle>Codigo del permiso: {transactions.codPermiss}</ListItem.Subtitle>
                                <ListItem.Subtitle>Horas: {transactions.horas}</ListItem.Subtitle>
                                <ListItem.Subtitle>Estado: {transactions.estado === "A" ? "ACTIVO" : transactions.estado === "I" ? "INACTIVO" : transactions.estado === "*" ? "ELIMINADO" : ""}({transactions.estado})</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    );
                })}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    },
    btnSearch: {
        position: "absolute",
        bottom: 80,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    },
    viewBody: {
        height: "100%"
    },
})


