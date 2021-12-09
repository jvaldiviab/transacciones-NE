import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from 'react-native-elements'

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
        <View style={styles.viewBody}>
            <ScrollView>
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
                                <ListItem.Subtitle>Estado: {permission.estado === "A" ? "ACTIVO" : permission.estado === "I" ? "INACTIVO" : permission.estado === "*" ? "ELIMINADO" : ""}({permission.estado})</ListItem.Subtitle>
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
                onPress={() => navigation.navigate("CreatePermissions")}
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
    viewBody: {
        height: "100%"
    },
})


