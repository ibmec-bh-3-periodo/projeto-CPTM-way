
### 🔐 **Endpoint /Login**  
- **POST /login**: recebe e-mail e senha → verifica no banco JSON → retorna sucesso ou erro.
- **GET /login**: durante a validação do login, utilizamos o método GET para verificar se o usuário existe no banco de dados.

---

### 📝 **Endpoint /Cadastro**  
- **POST /cadastro**: recebe nome, e-mail, senha → salva no banco JSON se e-mail não existir.
- **GET /cadastro**: durante a validação do cadastro, utilizamos o método GET para verificar se o e-mail já existe no banco de dados.

---

### 🔍 **Endpoint /Usuarios**
- **GET /usuarios**: retorna todos os usuários do banco JSON.

---

### 🗃️ **Conexão com banco JSON**  
- A API lê e escreve em um arquivo `.json` (ex: `users_db.json`, `estacoes_db.json`, ...).  
- Cada POST (login/cadastro) **modifica** ou **lê** os dados desse arquivo.