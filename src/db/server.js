const express = require("express");
const fs = require("fs");
const data =require("./users.json");

const server = express();
server.use(express.json());

server.post("/cadastro", (req, res) => {
  const novoUsuario = req.body;
  data.push(novoUsuario);
  fs.writeFileSync("./users.json", JSON.stringify(data, null, 2));
  res.status(201).send(data);
});



server.listen(3000, () => {
  console.log("Servidor ativo na porta 3333");
});
