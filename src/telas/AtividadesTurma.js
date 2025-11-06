import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AtividadesTurma({ navigation, route }) {
  const { turma } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Turma: {turma.nome}</Text>
      <Text style={styles.subtitulo}>Professor: {turma.professor}</Text>

      <View style={styles.caixa}>
        <Text style={styles.tituloCaixa}>Atividades cadastradas:</Text>
        {turma.atividades && turma.atividades.length > 0 ? (
          turma.atividades.map((atv, index) => (
            <Text key={index} style={styles.item}>{`• ${atv}`}</Text>
          ))
        ) : (
          <Text style={styles.semAtividades}>Nenhuma atividade cadastrada.</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitulo: { fontSize: 16, color: '#666', marginBottom: 20 },
  caixa: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  tituloCaixa: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  item: { fontSize: 16, marginBottom: 5 },
  semAtividades: { fontStyle: 'italic', color: '#777' },
  botaoVoltar: {
    backgroundColor: '#4da6ff',
    padding: 12,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
});
