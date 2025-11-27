import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
} from "react-native";

const compromissos = [
    { id: "1", hora: "09:30", titulo: "Reunião 'Daily'" },
    { id: "2", hora: "14:00", titulo: "Reunião com clientes & Carros" },
    { id: "3", hora: "15:30", titulo: "Prazo final projeto X" },
];

const compromissos2 = [
    { id: "4", hora: "09h30", titulo: "Reunião 'Daily'" },
    { id: "5", hora: "12h00", titulo: "Almoço com a diretoria" },
    { id: "6", hora: "15h00", titulo: "Saída viagem" },
];

const compromissos3 = [
    { id: "7", hora: "09h30", titulo: "Reunião 'Daily'" },
    { id: "8", hora: "13h30", titulo: "Visita técnica Uni-Facef" },
    { id: "9", hora: "16h30", titulo: "Prazo final Projeto X" },
];

export default function AgendaScreen() {
    return (
        <ScrollView style={styles.screen}>
            <Text style={styles.nomePessoa2}>KAIKI</Text>
            <Text style={styles.nomePessoa2}>Engenharia de Software </Text>
            <View style={styles.container}>
                <Text style={styles.nomePessoa}>EU</Text>
                <FlatList
                    data={compromissos}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingTop: 16 }}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.itemHora}>{item.hora} {item.titulo}</Text>
                        </View>
                    )}
                />
            </View>

            <View style={styles.container}>
                <Text style={styles.nomePessoa}>Jurema (chefe)</Text>
                <FlatList
                    data={compromissos2}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingTop: 16 }}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.itemHora}>{item.hora} {item.titulo}</Text>
                        </View>
                    )}
                />
            </View>

            <View style={styles.container}>
                <Text style={styles.nomePessoa}>Aderbal</Text>
                <FlatList
                    data={compromissos3}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingTop: 16 }}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.itemHora}>{item.hora} {item.titulo}</Text>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#f5f5f5",
    },
    container: {
        paddingTop: 20,
        paddingLeft: 5,
    },
    nomePessoa: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    nomePessoa2: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 10
    },
    item: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
    },
    itemHora: {
        fontSize: 16,
    },
    itemTitulo: {
        fontSize: 16,
        marginTop: 4,
    },
});
