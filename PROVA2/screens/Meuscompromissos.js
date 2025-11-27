import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from "react-native";

const compromissosKaiki = [
    { id: "1", hora: "09:30", titulo: "Reunião 'Daily'" },
    { id: "2", hora: "14:00", titulo: "Reunião com clientes & Carros" },
    { id: "3", hora: "16:30", titulo: "Prazo final projeto X" },
];

export default function InfoScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>KAIKI</Text>
            <Text style={styles.course}>Engenharia de Software</Text>

            <Text style={styles.name} >EU</Text>

            <FlatList
                data={compromissosKaiki}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingTop: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemHora}>{item.hora} {item.titulo}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        backgroundColor: "#f5f5f5",
    },
    name: {
        marginTop: 10,
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
    },
    course: {
        fontSize: 20,
        marginTop: 4,
        marginBottom: 20,
        textAlign: "center",
    },
    item: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 12,
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
