import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Icon, Input, Text } from 'react-native-elements'
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../../utils/firebase";

export default function SearchWorker({ navigation }) {

    const [query, setQuery] = useState("");
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        firebase.db.collection("workers").onSnapshot((querySnapshot) => {
            const workers = [];
            querySnapshot.docs.forEach((doc) => {
                const { codigo, nombre, estado } = doc.data();
                workers.push({
                    id: doc.id,
                    codigo,
                    nombre,
                    estado,
                });
            });
            setWorkers(workers);
        });
    }, []);

    let searchedWorkers = [];

    if (!query.length >= 1) {
        searchedWorkers = workers;
    } else {
        searchedWorkers = workers.filter(worker => {
            const workerCod = worker.codigo.toLowerCase();
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

                {searchedWorkers.map((worker) => {
                    return (
                        <ListItem
                            key={worker.id}
                            bottomDivider
                            onPress={() => {
                                navigation.navigate("DetailWorker", {
                                    workerId: worker.id,
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
                                <ListItem.Title>Codigo: {worker.codigo}</ListItem.Title>
                                <ListItem.Subtitle>Nombre: {worker.nombre}</ListItem.Subtitle>
                                <ListItem.Subtitle>Estado: {worker.estado === "A" ? "ACTIVO" : worker.estado === "I" ? "INACTIVO" : worker.estado === "*" ? "ELIMINADO" : ""}({worker.estado})</ListItem.Subtitle>
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


