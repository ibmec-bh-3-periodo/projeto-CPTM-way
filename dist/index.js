"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
// Caminho para o arquivo JSON
const dataPath = path_1.default.join(__dirname, 'db/users_db.json');
// Carregar dados iniciais (cria arquivo se não existir)
let data = [];
try {
    const rawData = fs_1.default.readFileSync(dataPath, 'utf-8');
    data = JSON.parse(rawData);
}
catch (error) {
    if (error.code === 'ENOENT') {
        fs_1.default.writeFileSync(dataPath, '[]');
    }
    else {
        throw error;
    }
}
// GET (apenas para teste)
server.get("/usuarios", (_req, res) => {
    res.send(data);
});
// CADASTRO
server.post("/cadastro", ((req, res) => {
    const novoUsuario = req.body;
    const usuarioExistente = data.find(user => user.email === novoUsuario.email);
    if (usuarioExistente) {
        return res.status(400).json({ message: "Usuário já cadastrado!" });
    }
    data.push(novoUsuario);
    fs_1.default.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.status(201).json({ message: "Usuário cadastrado com sucesso!", usuario: novoUsuario });
}));
// LOGIN
server.post("/login", ((req, res) => {
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
}));
// Iniciar o servidor
server.listen(3333, () => {
    console.log("Servidor ativo na porta 3333");
});
