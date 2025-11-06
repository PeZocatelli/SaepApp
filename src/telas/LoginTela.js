import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function LoginTela({ navigation }) {
  const [modoCadastro, setModoCadastro] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('aluno');
  const [carregando, setCarregando] = useState(false);

  // === CADASTRO ===
  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    setCarregando(true);

    try {
      const { data, error } = await supabase
        .from('usuarios')
        .insert([{ nome, email, senha, tipo, turma: tipo === 'aluno' ? 'A' : null }])
        .select()
        .single();

      if (error) throw error;

      Alert.alert('Sucesso', 'Cadastro realizado!');
      setModoCadastro(false);
      setNome(''); setEmail(''); setSenha('');
    } catch (err) {
      Alert.alert('Erro no cadastro', err.message);
    } finally {
      setCarregando(false);
    }
  };

  // === LOGIN ===
  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Informe e-mail e senha!');
      return;
    }

    setCarregando(true);

    try {
      const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .eq('senha', senha)
        .maybeSingle();

      if (error) throw error;
      if (!usuario) {
        Alert.alert('Erro', 'E-mail ou senha incorretos!');
        return;
      }

      Alert.alert('Bem-vindo(a)', usuario.nome);

      if (usuario.tipo === 'professor') {
        navigation.navigate('PrincipalProfessor', { nome: usuario.nome });
      } else {
        navigation.navigate('PrincipalAluno', { nome: usuario.nome });
      }

    } catch (err) {
      Alert.alert('Erro no login', err.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.form}>
        <Text style={styles.titulo}>
          {modoCadastro ? 'Cadastro' : 'Login'}
        </Text>

        {modoCadastro && (
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        {modoCadastro && (
          <View style={styles.tipoContainer}>
            <TouchableOpacity
              onPress={() => setTipo('aluno')}
              style={[styles.tipoBotao, tipo === 'aluno' && styles.tipoSelecionado]}>
              <Text style={[styles.tipoTexto, tipo === 'aluno' && styles.tipoTextoSel]}>
                Aluno
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTipo('professor')}
              style={[styles.tipoBotao, tipo === 'professor' && styles.tipoSelecionado]}>
              <Text style={[styles.tipoTexto, tipo === 'professor' && styles.tipoTextoSel]}>
                Professor
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.botao}
          onPress={modoCadastro ? handleCadastro : handleLogin}
          disabled={carregando}>
          {carregando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textoBotao}>
              {modoCadastro ? 'Cadastrar' : 'Entrar'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModoCadastro(!modoCadastro)}>
          <Text style={styles.link}>
            {modoCadastro
              ? 'Já tem conta? Fazer login'
              : 'Não tem conta? Cadastre-se'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// === ESTILOS ===
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef4ff', justifyContent: 'center', alignItems: 'center' },
  form: { width: '85%', backgroundColor: '#fff', padding: 25, borderRadius: 20, elevation: 5 },
  titulo: { fontSize: 30, fontWeight: 'bold', color: '#3b5998', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#f8f8f8', borderRadius: 12, padding: 12, marginBottom: 15, fontSize: 16, borderWidth: 1, borderColor: '#ddd' },
  botao: { backgroundColor: '#3b5998', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  textoBotao: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  tipoContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  tipoBotao: { flex: 1, marginHorizontal: 4, paddingVertical: 10, borderRadius: 10, alignItems: 'center', backgroundColor: '#dfe6f0' },
  tipoSelecionado: { backgroundColor: '#3b5998' },
  tipoTexto: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  tipoTextoSel: { color: '#fff' },
  link: { textAlign: 'center', marginTop: 15, color: '#3b5998', fontSize: 16, textDecorationLine: 'underline' },
});
