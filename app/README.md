# Cad User

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) na versão 14.2.6.

## Objetivo

Realizar o cadastro de usuários atráves de um sistema web. Sendo possível visualizar a listagem, criar novos usuários, editar e deletar o mesmo.

## Como abrir a aplicação?

1. Primeiramente clone esse projeto para seu ambiente de desenvolvimento

2. Assim que abrir o projeto em sua IDLE preferida, no terminal digite `npm install`, para realizar a instalação do pacote `NPM`.

3. Feito os passos acima, rode a aplicação com o seguinte comando: `ng serve`. Após alguns segundos acesse `http://localhost:4200/` e automaticamente será carregado a aplicação.

## Solução

Após a leitura do documento, foi criado a lógica primária em papel para melhor entendimento de como funcionaria todo o sistema. Desde de arquitetura de pasta a como seria dividido as páginas e seus respectivos componentes.

Em seguida a primeira parte a ser montada foi os formulários tanto de cadastro como de edição, implementando as devidas validações de campo, e a estilização do formulário.

Feito os passos anteriores, foi criado a parte de listagem dos usuários vindo da `API` fornecida e persistindo os dados em LocalStorage. A partir deste ponto foi implementado as funcionalidades de edição e deleção.

## TESTE

## Bibliotecas utilizadas

 - [Material UI](https://material.angular.io/);

 - [Text Mask Input](https://www.npmjs.com/package/angular2-text-mask);


