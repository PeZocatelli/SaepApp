import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function LoginTela({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha e-mail e senha!");
      return;
    }

    // Simula login sem autenticação
    // Se quiser, pode validar algo simples aqui
    Alert.alert("Sucesso", "Login realizado!");
    navigation.navigate("PrincipalProfessor", { nome: email });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#666"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#3b5998",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  botao: {
    width: "100%",
    height: 50,
    backgroundColor: "#3b5998",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
