import { View, Text, StyleSheet, Button } from 'react-native';

export default function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tela de Detalhes</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
      <Button title="Perfil" onPress={() => navigation.navigate('Perfil')} />
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
