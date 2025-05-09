const btnCadastrar = document.getElementById("button2");

const email = document.getElementById("email");
const confirmarEmail = document.getElementById("confirmarEmail");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");

document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    window.location.href = "login.html"; 
});