# :maple_leaf: Next Level Week #4 :maple_leaf:

> API Rest desenvolvida durante a Next Level Week #4 da Rocketseat.

### Requisitos
- Node.js
- YARN | NPM

### Tecnologias Usadas
- TypeScript (linguagem de programação baseada em tipagem)
- Node.js (executa Javascript no lado do servidor)
- Express (framework para servidor)
- TypeORM (ORM baseado em entidades)
- Jest.js (realização de testes)
- SQLite (banco de dados)
- Nodemailer (serviço de envio de email "fake")
- Handlebars (criação de views dinâmicas em relação às variáveis do backend)
- Yup (validação)

### Executando
- Clone o projeto:
  ```shell
  git@github.com:cleefsouza/nlw04.git
  ```

- Instale as dependências:
  ```shell
  yarn -i
  # ou
  npm install
  ```

- Executando api:
  ```shell
  yarn dev
  # ou
  npm run dev
  ```

### Recursos
- `/user [POST]` - Cadastro de usuários 
- `/survey [POST]` - Cadastro de presquisas
- `/surveys [GET]` - Listagem das pesquisas cadastradas
- `/send-mail [POST]` - Envio de email
- `/answer/:value [GET]` - Salvando resposta
- `/nps/:survey [GET]` - Buscando calculo NPS

### Executando testes
- Execute o seguinte comando:

    ```shell
    yarn tests
    # ou
    npm run tests
    ```
### Autor <div id="autor"></div>
Aryosvalldo Cleef ─ [linkedin](https://www.linkedin.com/in/aryosvalldo-cleef/) ─ [@cleefsouza](https://github.com/cleefsouza)

### Meta <div id="meta"></div>
Made with :green_heart: by **Cleef Souza**
