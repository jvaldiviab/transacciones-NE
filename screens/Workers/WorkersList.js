import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../../utils/firebase";

export default function WorkersList({ navigation }) {
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

    return (
        <ScrollView>
            <Button
                onPress={() => navigation.navigate("CreateWorker")}
                title="Agregar nuevo trabajador"
            />
            {workers.map((worker) => {
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
                            <ListItem.Title>{worker.nombre}</ListItem.Title>
                            <ListItem.Subtitle>{worker.codigo}</ListItem.Subtitle>
                            <ListItem.Subtitle>Estado: {worker.estado === "A" ? "ACTIVO" : worker.estado === "I" ? "INACTIVO" : worker.estado === "*" ? "ELIMINADO" : ""}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({})


