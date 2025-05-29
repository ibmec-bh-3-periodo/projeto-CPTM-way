### 🔒 **Endpoint /Login**
- **POST /login**: recebe `email` e `senha` no corpo da requisição.
  - Se **email ou senha não forem informados**, retorna erro  
    `400 - Email e senha são obrigatórios`.
  - Se o **usuário não existir**, retorna erro  
    `404 - Usuário inexistente`.
  - Se a **senha estiver incorreta**, retorna erro  
    `401 - Senha incorreta`.
  - Se tudo estiver correto, retorna  
    `200 - Bem-vindo ao sistema`.

---

### 📝 **Endpoint /Cadastro**
- **POST /cadastro**: recebe `email` e `senha` no corpo da requisição.
  - Se já **existir** usuário com o mesmo `email`, retorna  
    `400 - Usuário já cadastrado!`.
  - Caso contrário:
    1. Adiciona o novo usuário ao array em memória.
    2. Persiste todo o array em `db/users_db.json` (indentado com 2 espaços).
    3. Retorna  
       `201 - Usuário cadastrado com sucesso!`  
       junto com o objeto do usuário criado.

---

### 🌐 **Endpoint /Usuarios**
- **GET /usuarios**: retorna todos os usuários cadastrados no arquivo `db/users_db.json`.
  - Usado principalmente para **testes** e inspeção dos dados.

---

### 💾 **Conexão com “banco” JSON**
- A API utiliza um arquivo local **`db/users_db.json`** como “banco de dados”.
- Na inicialização:
  1. Tenta ler o arquivo e fazer `JSON.parse`.
  2. Se não existir (`ENOENT`), cria um novo com `[]`.
- As operações de cadastro e login **leem** e **escrevem** neste mesmo arquivo.

---

### 🚀 **Execução do Servidor**
- Framework: **Express**, escutando a porta `3333`.
- Middlewares:
  - `express.json()` — parsing automático de JSON no corpo.
  - `cors()` — libera chamadas de front-ends externos (ex: React).
