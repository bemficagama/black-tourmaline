## Site microben.com.br
Controle parental de sites acessados, tendo como funcionalidades a definição de preferências do plug-in, personalização de categorias, seleção de categorias de sites pré-estabelecidos e classificadas por faixa etária, definição de horário de funcionamento, gerenciamento de categorias, gerenciamento de faixa etária, atualização automática das categorias pré-estabelecidas, servidor web service que responderá as atualizações de categorias pré-estabelecidas, relatório de tentativas de acessos.

Composto por:
a) Backend - ./backend
b) Frontend - ./frontend
c) Extensão do Chrome - ./chrome-extension

## Tecnologias

a) Backend
[Express](https://expressjs.com/pt-br/) Ver. 4

[Bcrypt](https://github.com/kelektiv/node.bcrypt.js/) Ver. 2.4

[Knex](https://knexjs.org/) Ver. 2.4

[JWT](https://jwt.io/) Ver. 0.5

[Passport](https://github.com/jaredhanson/passport/) Ver. 2

[Mysql](https://www.mysql.com/) Ver. 5.7

b) Frontend

[Angular](https://angular.io/) Ver. 14

[RXJS](https://rxjs.dev/) Ver. 7.5

[Typescript](https://github.com/Microsoft/TypeScript) Ver. 4.6

[Font Awesome](https://fontawesome.com/) Ver. 5

[Bootstrap](https://getbootstrap.com/) Ver. 5

c) Extensão do Chrome

[React](https://react.dev/) Ver. 18

[RXJS](https://rxjs.dev/) Ver. 7.5

[Typescript](https://github.com/Microsoft/TypeScript) Ver. 4.9

[Axios](https://github.com/axios/axios) Ver. 1.3

[Dexie](https://dexie.org/) Ver. 4.9

[Font Awesome](https://fontawesome.com/) Ver. 5

[Bootstrap](https://getbootstrap.com/) Ver. 5


## Build
a) Backend

Primeiramente criar um arquivo .env baseado no arquivo env_file e preencher as informações de banco de dados e chave secreta.

```bash
npm install 
npm run start
#ou
npm run dev
```

b) Frontend

Modificar o arquivos dentro da pasta ./enviroments para a URL e PORTA onde o Backend está rodando. Por padrão está apontando para localhost:4000.

```bash
npm install 
ng serve
```

c) Extensão do Chrome

Modificar o arquivos dentro da pasta .env_local para a URL e PORTA onde o Backend está rodando. Por padrão está apontando para localhost:4000.

```bash
npm install
npm run build
```
Nas configurações de Extensão Chrome selecionar "Carregar sem compactação", selecione o diretorio ./chrome-extension/build


## Colaboradores
[André Bemfica](https://github.com/bemficagama)
