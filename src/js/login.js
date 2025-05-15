const fs = require('fs').promises

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const result = await validateLogin();
    if (result === true) {
        window.location.href = "home.html";
    } else {
        alert(result);
    }
});

const users = require('../src/db/users.json').flatMap(item =>
    Array.isArray(item) ? item : [item]
);

function validateLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        return 'Preencha todos os campos';
    }
    if (!validateEmail(email)) {
        return 'Email inválido';
    }
    if (password.length < 6) {
        return 'A senha deve ter pelo menos 6 caracteres';
    }

    const match = users.find(u => u.email === email && u.senha === password);
    return match ? true : 'Email ou senha incorretos';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}