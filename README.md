 # PopBox - Sistema de Armazenamento de Arquivos

O PopBox é um projeto desenvolvido para a cadeira de Programação WEB I do curso Sistemas e Mídias Digitais da UFC. A equipe é composta por Carlos David Araújo Ventura, Carlos Manoel Bonifácio de Sousa, Francisco Gabriel De Sa Lima, Jean Carlos De Oliveira Vieira, Paulo Sergio Guedes Nemer Filho. O objetivo do projeto é criar um sistema de armazenamento de arquivos.

## Tecnologias Utilizadas

### Backend

- Node.js
- Express.js
- MySQL
- Sequelize
- JSON Web Tokens (jsonwebtoken)

### Frontend

- React
- React Router
- React Icons
- Styled Components
- Axios
- Formik
- Yup
- React Query

## Funcionalidades

O PopBox oferece as seguintes funcionalidades:

- Registro de usuários: Os usuários podem se cadastrar no sistema fornecendo informações básicas e criando uma conta.

- Autenticação: Os usuários podem fazer login no sistema usando suas credenciais. O sistema utiliza JSON Web Tokens (JWT) para autenticação segura.

- Armazenamento de Arquivos: Os usuários podem fazer upload de arquivos para o sistema. Os arquivos são armazenados em um servidor e associados ao usuário que os enviou.

- Gerenciamento de Arquivos: Os usuários podem visualizar, renomear e excluir os arquivos que enviaram.

## Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL (instalado e configurado)

### Configuração do Banco de Dados

1. Crie um banco de dados MySQL para o projeto.

2. Abra o arquivo `server/config/db.js` e atualize as informações de conexão com o banco de dados:

### Executando o Backend

1. Abra o terminal, navegue até o diretório `server` do projeto e execute o seguinte comando para instalar as dependências:

   ```bash
   npm install
   ```

2. Após a conclusão da instalação, execute o seguinte comando para iniciar o servidor backend:

   ```bash
   npm start
   ```

   O servidor backend será executado na porta 3002 por padrão.

### Executando o Frontend

1. Abra um novo terminal, navegue até o diretório `client` do projeto e execute o seguinte comando para instalar as dependências:

   ```bash
   npm install
   ```

2. Após a conclusão da instalação, execute o seguinte comando para iniciar o aplicativo frontend:

   ```bash
   npm start
   ```

   O aplicativo frontend será executado na porta 3000 por padrão.

3. Abra o navegador e acesse `http://localhost:3000` para visualizar o PopBox.

