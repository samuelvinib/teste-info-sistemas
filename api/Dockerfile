# Use uma imagem base do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos de configuração e dependências
COPY package.json .
COPY package-lock.json .

# Instale as dependências
RUN npm install 

# Copie o código do prisma Client para interagir com o banco de dados
COPY prisma ./prisma

# Gere o código do Prisma
RUN npx prisma generate

# Copie o código fonte da API
COPY src/ ./src/

# Expõe a porta da API
EXPOSE 3000

# Inicie a API
CMD ["npm", "run", "dev"]
