const express = require("express");
const fs = require("fs");
const path = require("path");

const server = express();
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

server.listen(3333, () => {
  console.log("Servidor ativo na porta 3333");
});

server.post("/cadastro", (req, res) => {
  const novoUsuario = req.body;
  data.push(novoUsuario);
  
  // Escrever usando caminho absoluto
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  
  res.status(201).send(data);
});