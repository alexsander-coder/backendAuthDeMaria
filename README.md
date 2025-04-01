# 🛡️ Backend Auth de Maria

Projeto backend de autenticação com [NestJS](https://nestjs.com/) e [PostgreSQL](https://www.postgresql.org/), utilizando **TypeORM**, **JWT**, **Passport** e **bcryptjs**.

Tecnologias utilizadas: **NestJS 11**, **TypeScript**, **PostgreSQL**, **TypeORM**, **Passport**, **JWT**, **bcryptjs**, **Jest**.

---

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/alexsander-coder/backendAuthDeMaria.git
cd backend-auth
npm install
# ou
yarn install
```

## 1. Configuração arquivo .env

Criar arquivo .env

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=seu_usuario
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=nome_do_banco
JWT_SECRET=sua_chave_jwt
JWT_EXPIRES_IN=3600s
```

## 2. start da aplicação

```bash
▶️ Execução

npm run start
```