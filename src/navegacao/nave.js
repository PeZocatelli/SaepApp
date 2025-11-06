import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../telas/LoginScreen';
import PrincipalProfessor from '../telas/PrincipalProfessor';
import AtividadesTurma from '../telas/AtividadesTurma'; 
const Stack = createNativeStackNavigator();

export default function Navegacao() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PrincipalProfessor" 
          component={PrincipalProfessor} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AtividadesTurma" 
          component={AtividadesTurma} 
          options={{ title: 'Atividades da Turma' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
