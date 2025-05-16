const express = require("express");
const cors    = require("cors");
const fs = require("fs");
const path = require("path");

const server = express();
server.use(cors());
server.use(express.json());

// Caminho para o arquivo JSON
const dataPath = path.join(__dirname, 'users.json');

// Carregar dados iniciais (cria arquivo se não existir)
let data = [];
try {
  data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
} catch (error) {
  if (error.code === 'ENOENT') {
    fs.writeFileSync(dataPath, '[]');
  } else {
    throw error;
  }
}

// GET (SO PARA TESTAR)
server.get("/usuarios", (req, res) => {
  res.send(data);
});

// CADASTRO
server.post("/cadastro", (req, res) => {
  const novoUsuario = req.body;

  const usuarioExistente = data.find(user => user.email === novoUsuario.email);

  if (usuarioExistente) {
    return res.status(400).json({ message: "Usuário já cadastrado!" });
  }

  data.push(novoUsuario);

  // ATUALIZA NO JSON
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  res.status(201).json({ message: "Usuário cadastrado com sucesso!", usuario: novoUsuario });
});

// LOGIN
server.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  
  const usuario = data.find(user => user.email === email);

  
  if (!usuario) {
    return res.status(404).json({ message: "Usuário inexistente" });
  }

  if (usuario.senha !== senha) {
    return res.status(401).json({ message: "Senha incorreta" });
  }

  res.status(200).json({ message: "Bem-vindo ao sistema" });
});

// Iniciar o servidor
server.listen(3333, () => {
  console.log("Servidor ativo na porta 3333");
});
