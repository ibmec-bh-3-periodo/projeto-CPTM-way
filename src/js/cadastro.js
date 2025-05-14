const botao = document.getElementById("button2");
botao.removeAttribute("onclick");

const form = document.getElementById("cadastroForm");
// Elemento para exibir mensagens de erro/sucesso
const msg = document.createElement("p");
msg.style.marginTop = "0.5rem";
form.appendChild(msg);

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // 1) captura os valores no momento do submit
    const email = document.getElementById("email").value.trim();
    const confirmarEmail = document.getElementById("confirmEmail").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmSenha").value;

    // 2) validações básicas
    if (!email || !confirmarEmail || !senha || !confirmarSenha) {
        msg.textContent = "Preencha todos os campos.";
        msg.style.color = "red";
        return;
    }
    if (email !== confirmarEmail) {
        msg.textContent = "Os e-mails não coincidem.";
        msg.style.color = "red";
        return;
    }
    if (senha !== confirmarSenha) {
        msg.textContent = "As senhas não coincidem.";
        msg.style.color = "red";
        return;
    }

    // 3) ler usuários do localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // 4) checar duplicidade de email
    if (users.some(u => u.email === email)) {
        msg.textContent = "Este e-mail já está cadastrado.";
        msg.style.color = "red";
        return;
    }

    // 5) salvar novo usuário
    users.push({ email, password: senha });
    localStorage.setItem("users", JSON.stringify(users));

    // 6) feedback e redirecionamento
    msg.textContent = "Cadastro realizado com sucesso!";
    msg.style.color = "green";
    
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
});