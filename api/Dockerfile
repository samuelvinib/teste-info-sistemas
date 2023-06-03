# Use uma imagem base do Node.js
FROM node:14-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos de configuração e dependências
COPY package.json .
COPY package-lock.json .

# Instale as dependências
RUN npm install 
RUN npm update mysql


# Copie o código fonte da API
COPY /src/ .

# Expõe a porta da API
EXPOSE 3000

# Inicie a API
CMD [ "npm", "run", "dev" ]
# CMD [ "npm", "start" ]
