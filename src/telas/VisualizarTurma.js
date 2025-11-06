import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VisualizarTurma({ route }) {
  const turma = route.params?.turma;
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Visualizando turma: {turma?.nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  texto: { fontSize: 24, fontWeight: 'bold' },
});
