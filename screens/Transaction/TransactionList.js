import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Icon } from 'react-native-elements'
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../../utils/firebase";

export default function TransactionList({ navigation }) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        firebase.db.collection("transactions").onSnapshot((querySnapshot) => {
            const transactions = [];
            querySnapshot.docs.forEach((doc) => {
                const { codWorker, codPermiss, horas, estado } = doc.data();
                transactions.push({
                    id: doc.id,
                    codWorker,
                    codPermiss,
                    horas,
                    estado,
                });
            });
            setTransactions(transactions);
        });
    }, []);

    return (
        <View style={styles.viewBody}>

            <ScrollView>

                {transactions.map((transaction) => {
                    return (
                        <ListItem
                            key={transaction.id}
                            bottomDivider
                            onPress={() => {
                                navigation.navigate("DetailTransaction", {
                                    transactionId: transaction.id,
                                });
                            }}
                        >
                            <ListItem.Chevron />
                            <ListItem.Content>
                                <ListItem.Title>Codigo Trabajador: {transaction.codWorker}</ListItem.Title>
                                <ListItem.Subtitle>codPermiss: {transaction.codPermiss}</ListItem.Subtitle>
                                <ListItem.Subtitle>Horas: {transaction.horas}</ListItem.Subtitle>
                                <ListItem.Subtitle>Estado: {transaction.estado === "A" ? "ACTIVO" : transaction.estado === "I" ? "INACTIVO" : transaction.estado === "*" ? "ELIMINADO" : ""}({transaction.estado})</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    );
                })}

            </ScrollView>
            <Icon
                type="material-community"
                name="plus"
                color="#60585e"
                reverse
                containerStyle={styles.btnContainer}
                onPress={() => navigation.navigate("CreateTransaction")}
            />
            <Icon
                type="material-community"
                name="account-search"
                color="#60585e"
                reverse
                containerStyle={styles.btnSearch}
                onPress={() => navigation.navigate("SearchTransaction")}
            />
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


