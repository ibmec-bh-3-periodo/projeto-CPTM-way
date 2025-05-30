import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const server = express();
server.use(cors());
server.use(express.json());

// Interface para usuário
interface Usuario {
  nome: string;
  telefone: string;
  email: string;
  senha: string;
}

// Caminho para o arquivo JSON
const dataPath = path.join(__dirname, 'db/users_db.json');

// Carregar dados iniciais (cria arquivo se não existir)
let data: Usuario[] = [];

try {
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  data = JSON.parse(rawData);
} catch (error: any) {
  if (error.code === 'ENOENT') {
    fs.writeFileSync(dataPath, '[]');
  } else {
    throw error;
  }
}

// GET (apenas para teste)
server.get("/usuarios", (_req: Request, res: Response) => {
  res.send(data);
});

// CADASTRO
server.post("/cadastro", ((req: Request, res: Response) => {
  const novoUsuario: Usuario = req.body;

  const usuarioExistente = data.find(user => user.email === novoUsuario.email);

  if (usuarioExistente) {
    return res.status(400).json({ message: "Usuário já cadastrado!" });
  }

  data.push(novoUsuario);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  res.status(201).json({ message: "Usuário cadastrado com sucesso!", usuario: novoUsuario });
}) as express.RequestHandler);

// LOGIN
server.post("/login", ((req: Request, res: Response) => {
  const { email, senha }: { email: string; senha: string } = req.body;

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
}) as express.RequestHandler);

// Iniciar o servidor
server.listen(3333, () => {
  console.log("Servidor ativo na porta 3333");
});
