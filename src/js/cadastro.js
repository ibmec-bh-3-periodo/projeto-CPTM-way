// src/js/cadastro.js

const form = document.getElementById("cadastroForm");
const email = document.getElementById("email");
const confirmarEmail = document.getElementById("confirmarEmail");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");
const msg = document.createElement("p");
form.appendChild(msg);

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // 1) validações
    if (email.value !== confirmarEmail.value) {
        msg.textContent = "Os e-mails não coincidem.";
        msg.style.color = "red";
        return;
    }
    if (senha.value !== confirmarSenha.value) {
        msg.textContent = "As senhas não coincidem.";
        msg.style.color = "red";
        return;
    }
    if (!email.value || !senha.value) {
        msg.textContent = "Preencha todos os campos.";
        msg.style.color = "red";
        return;
    }

    // 2) ler o array de usuários atual (ou criar um vazio)
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // 3) checar se o e-mail já existe
    if (users.some(u => u.email === email.value.trim())) {
        msg.textContent = "Este e-mail já está cadastrado.";
        msg.style.color = "red";
        return;
    }

    // 4) adicionar novo usuário
    users.push({
        email: email.value.trim(),
        password: senha.value // em produção não armazene texto puro!
    });
    localStorage.setItem("users", JSON.stringify(users));

    // 5) feedback e redirecionamento
    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
});