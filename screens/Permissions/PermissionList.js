import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../../utils/firebase";

export default function PermissionList({ navigation }) {
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        firebase.db.collection("permissions").onSnapshot((querySnapshot) => {
            const permissions = [];
            querySnapshot.docs.forEach((doc) => {
                const { codigo, nombre, estado } = doc.data();
                permissions.push({
                    id: doc.id,
                    codigo,
                    nombre,
                    estado,
                });
            });
            setPermissions(permissions);
        });
    }, []);

    return (
        <ScrollView>
            <Button
                onPress={() => navigation.navigate("CreatePermissions")}
                title="Agregar nuevo permiso"
            />
            {permissions.map((permission) => {
                return (
                    <ListItem
                        key={permission.id}
                        bottomDivider
                        onPress={() => {
                            navigation.navigate("DetailPermissions", {
                                permissionId: permission.id,
                            });
                        }}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{permission.nombre}</ListItem.Title>
                            <ListItem.Subtitle>{permission.codigo}</ListItem.Subtitle>
                            <ListItem.Subtitle>Estado: {permission.estado === "A" ? "ACTIVO" : permission.estado === "I" ? "INACTIVO" : permission.estado === "*" ? "ELIMINADO" : ""}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({})


