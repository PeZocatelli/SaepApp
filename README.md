#  Projeto React Native + Supabase

Aplicativo mobile desenvolvido em React Native com integração ao Supabase para autenticação e gerenciamento de usuários (professores e alunos). Inclui telas de login, cadastro, painel do professor com turmas e modais estilizados com formas geométricas de fundo.

Antes de iniciar, você precisa ter instalado Node.js (versão 16 ou superior), npm ou yarn, React Native CLI (ou Expo, se preferir), Android Studio (para emulador Android) ou Xcode (para iOS), e uma conta gratuita no Supabase.

A estrutura básica do projeto é:
project-root/
├─ App.js
├─ package.json
├─ src/
│ ├─ lib/
│ │ └─ supabase.js
│ ├─ telas/
│ │ ├─ LoginTela.js
│ │ ├─ PrincipalProfessor.js
│ │ ├─ PrincipalAluno.js
│ │ └─ AtividadesTurma.js
│ └─ navegacao/
│ └─ Navegacao.js
└─ README.md


Depois instale a navegação:
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler



E o Supabase:

Agora configure o Supabase. Crie um projeto em https://supabase.com, entre no **SQL Editor** e adicione:
```sql
create table if not exists usuarios (
  id bigserial primary key,
  nome text,
  email text unique,
  senha text,
  tipo text,
  turma text
);

create table if not exists turmas (
  id bigserial primary key,
  nome text,
  professor text,
  atividades jsonb
);
