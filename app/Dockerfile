# Use uma imagem base do Node.js com o Angular CLI instalado
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Instale o Angular CLI globalmente
RUN npm install -g @angular/cli

# Copie os arquivos de configuração e dependências
COPY package.json .
COPY package-lock.json .

# Instale as dependências
RUN npm install

# Copie o código fonte do aplicativo Angular
COPY src/ .

# # Execute o build do aplicativo Angular
RUN ng build --prod

# Expõe a porta do servidor Angular
EXPOSE 4200

# Inicie o servidor Angular
CMD [ "ng", "serve", "--host", "0.0.0.0" ]
