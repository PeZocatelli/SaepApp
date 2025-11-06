import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function PrincipalProfessor({ navigation, route }) {
  const nomeProfessor = route.params?.nome || 'Professor(a)';
  const [atividades, setAtividades] = useState([]);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [modalDetalhes, setModalDetalhes] = useState(false);
  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
  const [nomeNovaAtividade, setNomeNovaAtividade] = useState('');
  const [tarefasSelecionadas, setTarefasSelecionadas] = useState([]);

  // Carregar atividades do professor
  const carregarAtividades = async () => {
    const { data, error } = await supabase
      .from('turmas') // mantém a tabela existente
      .select('*')
      .eq('professor', nomeProfessor)
      .order('id', { ascending: false });
    if (!error) setAtividades(data || []);
  };

  useEffect(() => {
    carregarAtividades();
  }, []);

  const handleVisualizarAtividade = (atividade) => {
    setAtividadeSelecionada(atividade);
    setModalVisualizar(true);
  };

  const handleAbrirDetalhes = (atividade) => {
    setAtividadeSelecionada(atividade);
    setTarefasSelecionadas(atividade.tarefas || ['Prova 1', 'Trabalho em grupo']);
    setModalDetalhes(true);
  };

  const handleAbrirExcluir = (atividade) => {
    setAtividadeSelecionada(atividade);
    setModalExcluir(true);
  };

  const handleExcluirAtividade = async () => {
    if (!atividadeSelecionada) return;

    const { error } = await supabase
      .from('turmas')
      .delete()
      .eq('id', atividadeSelecionada.id);

    if (error) {
      Alert.alert('Erro', error.message);
      return;
    }

    setAtividades(prev => prev.filter(a => a.id !== atividadeSelecionada.id));
    setModalExcluir(false);
    setAtividadeSelecionada(null);
  };

  const handleAdicionarAtividade = async () => {
    if (!nomeNovaAtividade) return Alert.alert('Erro', 'Digite o nome da atividade.');
    if (tarefasSelecionadas.length === 0) return Alert.alert('Erro', 'Selecione ao menos uma tarefa.');

    const { data, error } = await supabase
      .from('turmas')
      .insert([{ nome: nomeNovaAtividade, professor: nomeProfessor }])
      .select();

    if (error) return Alert.alert('Erro', error.message);

    setAtividades(prev => [data[0], ...prev]);
    Alert.alert(
      'Sucesso',
      `Atividade "${nomeNovaAtividade}" criada com as tarefas: ${tarefasSelecionadas.join(', ')}`
    );

    setNomeNovaAtividade('');
    setTarefasSelecionadas([]);
    setModalAdicionar(false);
  };

  const renderAtividade = ({ item }) => (
    <View style={styles.atividadeContainer}>
      <Text style={styles.atividadeTexto}>{item.nome}</Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity 
          onPress={() => handleAbrirDetalhes(item)}
          style={[styles.botao, { backgroundColor: 'green' }]}
        >
          <Text style={styles.textoBotao}>Tarefas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => handleVisualizarAtividade(item)} 
          style={[styles.botao, { backgroundColor: '#4da6ff', marginLeft: 10 }]}
        >
          <Text style={styles.textoBotao}>Visualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => handleAbrirExcluir(item)} 
          style={[styles.botao, { backgroundColor: 'red', marginLeft: 10 }]}
        >
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Formas geométricas de fundo */}
      <View style={styles.shape1} />
      <View style={styles.shape2} />
      <View style={styles.shape3} />
      <View style={styles.shape4} />

      {/* Conteúdo principal */}
      <Text style={styles.titulo}>Olá, {nomeProfessor}!</Text>

      <View style={styles.topButtons}>
        <TouchableOpacity onPress={() => setModalAdicionar(true)} style={styles.addButton}>
          <Text style={styles.textoBotao}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.logoutButton}>
          <Text style={styles.textoBotao}>←</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={atividades}
        keyExtractor={item => item.id.toString()}
        renderItem={renderAtividade}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Modal Tarefas */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDetalhes}
        onRequestClose={() => setModalDetalhes(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Tarefas da Atividade</Text>
            {atividadeSelecionada && (
              <>
                <Text style={{ marginBottom: 8 }}>Atividade: {atividadeSelecionada.nome}</Text>
                {tarefasSelecionadas.length === 0 ? (
                  <Text style={{ fontStyle: 'italic' }}>Nenhuma tarefa cadastrada.</Text>
                ) : (
                  tarefasSelecionadas.map((a, i) => (
                    <Text key={i} style={{ marginBottom: 4 }}>• {a}</Text>
                  ))
                )}
              </>
            )}
            <TouchableOpacity 
              style={[styles.botaoModal, { backgroundColor: '#ccc' }]} 
              onPress={() => setModalDetalhes(false)}
            >
              <Text>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Visualizar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisualizar}
        onRequestClose={() => setModalVisualizar(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Informações da Atividade</Text>
            {atividadeSelecionada && (
              <>
                <Text>ID: {atividadeSelecionada.id}</Text>
                <Text>Nome: {atividadeSelecionada.nome}</Text>
                <Text>Professor: {atividadeSelecionada.professor}</Text>
              </>
            )}
            <TouchableOpacity style={[styles.botaoModal, { backgroundColor: '#ccc' }]} onPress={() => setModalVisualizar(false)}>
              <Text>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Adicionar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAdicionar}
        onRequestClose={() => setModalAdicionar(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Adicionar Nova Atividade</Text>
            <TextInput 
              placeholder="Nome da atividade" 
              value={nomeNovaAtividade} 
              onChangeText={setNomeNovaAtividade} 
              style={styles.inputModal}
            />
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Selecione as tarefas:</Text>
            {['Prova 1','Trabalho em grupo','Lista de exercícios','Apresentação','Projeto final'].map((tarefa, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.itemAtividade,
                  tarefasSelecionadas.includes(tarefa) && { backgroundColor: '#4caf50' }
                ]}
                onPress={() => {
                  if (tarefasSelecionadas.includes(tarefa)) {
                    setTarefasSelecionadas(prev => prev.filter(a => a !== tarefa));
                  } else {
                    setTarefasSelecionadas(prev => [...prev, tarefa]);
                  }
                }}
              >
                <Text style={[styles.textoAtividade, tarefasSelecionadas.includes(tarefa) && { color: '#fff' }]}>{tarefa}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.botaoModal, { backgroundColor: '#4da6ff' }]} onPress={handleAdicionarAtividade}>
              <Text style={{ color: '#fff' }}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botaoModal, { backgroundColor: '#ccc' }]} onPress={() => setModalAdicionar(false)}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Excluir */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalExcluir}
        onRequestClose={() => setModalExcluir(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Excluir Atividade</Text>
            {atividadeSelecionada && (
              <Text>Deseja realmente excluir a atividade "{atividadeSelecionada.nome}"?</Text>
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity style={[styles.botaoModal, { backgroundColor: '#ccc', flex: 1, marginRight: 10 }]} onPress={() => setModalExcluir(false)}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.botaoModal, { backgroundColor: 'red', flex: 1 }]} onPress={handleExcluirAtividade}>
                <Text style={{ color: '#fff' }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2', alignItems: 'center' },
  shape1: { position: 'absolute', width: 300, height: 300, backgroundColor: '#ffb347', borderRadius: 150, top: -150, left: -100, opacity: 0.3 },
  shape2: { position: 'absolute', width: 200, height: 200, backgroundColor: '#ffcc70', borderRadius: 100, bottom: -100, right: -50, opacity: 0.3 },
  shape3: { position: 'absolute', width: 150, height: 150, backgroundColor: '#70c1b3', borderRadius: 75, top: 150, right: -75, opacity: 0.2 },
  shape4: { position: 'absolute', width: 120, height: 120, backgroundColor: '#ff6f61', borderRadius: 60, bottom: 80, left: -60, opacity: 0.2 },

  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#3b5998', textAlign: 'center', zIndex: 1 },
  topButtons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, width: '100%' },
  addButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#4caf50', justifyContent: 'center', alignItems: 'center' },
  logoutButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ff6f61', justifyContent: 'center', alignItems: 'center' },

  textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  atividadeContainer: { width: '100%', padding: 12, backgroundColor: '#fff', marginBottom: 12, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  atividadeTexto: { fontSize: 16, fontWeight: 'bold' },

  botao: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8 },
  modalFundo: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { width: '85%', backgroundColor: '#fff', padding: 20, borderRadius: 12, alignItems: 'center' },
  modalTitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  botaoModal: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 8, alignItems: 'center', marginTop: 10, minWidth: 120 },
  inputModal: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 8, marginBottom: 10, width: '100%' },
  itemAtividade: { padding: 8, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', marginVertical: 4, backgroundColor: '#f9f9f9', width: '100%', alignItems: 'center' },
  textoAtividade: { fontSize: 14, textAlign: 'center' },
});
