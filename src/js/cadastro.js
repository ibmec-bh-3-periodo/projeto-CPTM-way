const botao = document.getElementById("button2");
botao.removeAttribute("onclick");

const form = document.getElementById("cadastroForm");
// Elemento para exibir mensagens de erro/sucesso
const msg = document.createElement("p");
msg.style.marginTop = "0.5rem";
form.appendChild(msg);

form.addEventListener("submit", async function(event) {
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

    try {
        // 3) checar duplicidade no servidor JSON
        const resGet = await fetch("http://localhost:3333/users?email=" + encodeURIComponent(email));
        const existing = await resGet.json();
        if (existing.length > 0) {
            msg.textContent = "Este e-mail já está cadastrado.";
            msg.style.color = "red";
            return;
        }

        // 4) enviar novo usuário para o "banco" JSON
        const resPost = await fetch("http://localhost:3333/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password: senha })
        });

        if (!resPost.ok) {
            throw new Error("Erro ao salvar no servidor: " + resPost.status);
        }

        // 5) feedback e redirecionamento
        msg.textContent = "Cadastro realizado com sucesso!";
        msg.style.color = "green";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);

    } catch (error) {
        console.error(error);
        msg.textContent = "Ocorreu um erro. Tente novamente mais tarde.";
        msg.style.color = "red";
    }
});
