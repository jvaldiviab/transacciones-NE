import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../../utils/firebase";

export default function WorkersList({ navigation }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        firebase.db.collection("workers").onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.docs.forEach((doc) => {
                const { codigo, nombre, estado } = doc.data();
                users.push({
                    id: doc.id,
                    codigo,
                    nombre,
                    estado,
                });
            });
            setUsers(users);
        });
    }, []);

    return (
        <ScrollView>
            <Button
                onPress={() => navigation.navigate("CreateWorker")}
                title="Create User"
            />
            {users.map((user) => {
                return (
                    <ListItem
                        key={user.id}
                        bottomDivider
                        onPress={() => {
                            navigation.navigate("DetailWorker", {
                                workerId: user.id,
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
                            <ListItem.Title>{user.nombre}</ListItem.Title>
                            <ListItem.Subtitle>{user.codigo}</ListItem.Subtitle>
                            <ListItem.Subtitle>Estado: {user.estado}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({})


