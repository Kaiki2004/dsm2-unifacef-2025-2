import { View, Text, Button, StyleSheet } from 'react-native';

export default function PerfilScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tela de Perfil</Text>
      <Button 
        title="Voltar para Detalhes"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 24,
    color: '#007AFF',
    marginBottom: 20,
    fontWeight: 'bold'
  }
});
