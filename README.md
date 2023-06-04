# Teste Info Tecnologia

<img src="https://media.licdn.com/dms/image/C4D0BAQF7z1tSD1yohQ/company-logo_200_200/0/1672679506995?e=1694044800&v=beta&t=QyUh8FdJiCRVuf16s-5yqMtUIL-zGH8cM8qG453gZ90" width="128" style=" display: block;margin-left: auto;margin-right: auto;">

# Descrição

> #
> ## Projeto Backend - CRUD de Veículos em Node.js
>
>Descrição: Um projeto de backend em Node.js que implementa operações CRUD (Create, Read, Update, Delete) para gerenciar dados de veículos. Os dados foram armazenos em um banco de dados. Inclui testes unitários utilizando Mocha.
>
> ## Projeto Frontend - Lista de Veículos em Angular
> Descrição: Um projeto de frontend em Angular que exibe uma lista de veículos consumindo as APIs fornecidas pelo backend.
>
> ### Empresa: Info Tecnologia
>#
>
> ## Tecnologias utilizadas no projeto:
>  - `Back-end` : Node.js
>  - `Front-end` : Angular
>  - `Banco de dados` : Mysql
>#

# Instalação do projeto

> - Este projeto foi construido com docker, é necessário possuir o docker instalado em sua máquina préviamente.

 ## Passo 1
   Após clonar o projeto em sua máquina navegue até o diretório raiz do projeto:
```bash
  cd teste-info-tecnologia
```

 ## Passo 2
   Execute o seguinte comando para construir e iniciar os containers do Docker:
```bash
  docker-compose up -d --build
```

 ## Passo 3
   Acesse o container da API:
```bash
  docker exec -it info-sistemas-api sh
```

 ## Passo 4
   Dentro do container da API, crie as tabelas no banco de dados:
```bash
  npx prisma db push
```

 ## Passo 5
   Em seguida, popule as tabelas com dados iniciais:
```bash
  npx prisma db seed
```