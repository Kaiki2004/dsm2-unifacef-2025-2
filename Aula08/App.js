import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [imagem, setImagem] = useState(null);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  async function abrirCamera() {
    try {
      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        setImagem(result.assets[0].uri);
      }
    } catch (err) {
      console.warn('Erro ao abrir câmera:', err);
    }
  }

  async function abrirGaleria() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        setImagem(result.assets[0].uri);
      }
    } catch (err) {
      console.warn('Erro ao abrir galeria:', err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      {imagem ? (
        <Image source={{ uri: imagem }} style={styles.avatarImage} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.placeholderText}>K</Text>
        </View>
      )}

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btn} onPress={abrirCamera}>
          <Text style={styles.btnText}>Tirar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={abrirGaleria}>
          <Text style={styles.btnText}>Escolher da Galeria</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 48,
    color: '#666',
  },
  buttons: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  btn: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#1976d2',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
});
