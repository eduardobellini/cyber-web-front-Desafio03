# Cyber Web Front - E-commerce com Clerk Auth

Este é um projeto de e-commerce desenvolvido em React + TypeScript + Vite com autenticação via Clerk.

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca para construção da interface
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Bundler e ferramenta de desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento para aplicações React
- **Clerk** - Plataforma de autenticação e gerenciamento de usuários
- **React Query** - Gerenciamento de estado e cache para requisições
- **Axios** - Cliente HTTP para requisições à API

## 🔧 Configuração do Projeto

### 1. Instalação das dependências
```bash
npm install
```

### 2. Configuração do Clerk

1. Acesse [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
2. Crie uma conta (se não tiver)
3. Crie um novo projeto
4. Vá em "API Keys" no painel lateral
5. Copie sua "Publishable Key"

### 3. Configuração das Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Edite o arquivo `.env` e adicione sua chave do Clerk:
```env
VITE_CLERK_KEY=pk_test_sua_chave_aqui
```

### 4. Executar o projeto
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🔐 Funcionalidades de Autenticação

### ✅ Implementado

- **Login/Logout**: Botões de autenticação no header (desktop e mobile)
- **Registro**: Componente de SignUp do Clerk
- **Perfil do usuário**: Página completa de gerenciamento de perfil
- **Rotas protegidas**: Carrinho e perfil requerem autenticação
- **Redirecionamento**: Usuários não autenticados são redirecionados para login

### 📍 Rotas Disponíveis

- `/` - Página inicial (pública)
- `/shop` - Lista de produtos (pública)
- `/product/:id` - Detalhes do produto (pública)
- `/sign-in` - Página de login
- `/sign-up` - Página de registro
- `/profile` - Perfil do usuário (protegida)
- `/cart` - Carrinho de compras (protegida)

### 🎨 Componentes do Clerk

O projeto utiliza os seguintes componentes do Clerk:

- `SignedIn` / `SignedOut` - Renderização condicional baseada no estado de autenticação
- `SignInButton` - Botão de login
- `UserButton` - Botão com avatar e menu do usuário
- `SignIn` / `SignUp` - Componentes de autenticação
- `UserProfile` - Componente completo de gerenciamento de perfil
- `RedirectToSignIn` - Redirecionamento para login

### 🛡️ Proteção de Rotas

O componente `ProtectedRoute` é usado para proteger rotas que requerem autenticação:

```tsx
<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <UserProfilePage />
    </ProtectedRoute>
  } 
/>
```

## 🎯 Como Usar

1. **Para acessar áreas protegidas**: Clique em "Entrar" no header
2. **Para criar uma conta**: Use o link "Sign up" na tela de login
3. **Para gerenciar o perfil**: Após logado, clique no avatar no header e selecione "Manage account"
4. **Para fazer logout**: Clique no avatar e selecione "Sign out"

## 📱 Layout Responsivo

A autenticação foi implementada tanto para desktop quanto para dispositivos móveis, com:
- Menu hambúrger no mobile com opções de login/logout
- UserButton responsivo com tamanhos adequados para cada tela
- Modais de autenticação que se adaptam ao tamanho da tela

## 🔄 Próximos Passos

- Integrar dados do usuário com carrinho de compras
- Adicionar histórico de pedidos
- Implementar favoritos por usuário
- Adicionar roles e permissões
- Integrar com sistema de pagamento

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request