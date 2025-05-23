// cadastro.js
const form = document.getElementById("cadastroForm");
const msg  = document.createElement("p");
msg.style.marginTop = "0.5rem";
form.appendChild(msg);

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // 1) Captura os valores do formulário
  const email          = document.getElementById("email").value.trim();
  const confirmarEmail = document.getElementById("confirmEmail").value.trim();
  const senha          = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmSenha").value;

  // 2) Validações básicas
  if (!email || !confirmarEmail || !senha || !confirmarSenha) {
    msg.textContent = "Preencha todos os campos.";
    msg.style.color   = "red";
    return;
  }

  // Nova validação: senha com pelo menos 6 caracteres
  if (senha.length < 6) {
    msg.textContent = "A senha deve ter pelo menos 6 caracteres.";
    msg.style.color   = "red";
    return;
  }

  if (email !== confirmarEmail) {
    msg.textContent = "Os e-mails não coincidem.";
    msg.style.color   = "red";
    return;
  }
  if (senha !== confirmarSenha) {
    msg.textContent = "As senhas não coincidem.";
    msg.style.color   = "red";
    return;
  }

  try {
    // 3) Busca todos os usuários para verificar duplicidade
    const resGet = await fetch("http://localhost:3333/usuarios");
    if (!resGet.ok) throw new Error("Falha ao buscar usuários");
    const usuarios = await resGet.json();

    if (usuarios.some(u => u.email === email)) {
      msg.textContent = "Este e-mail já está cadastrado.";
      msg.style.color   = "red";
      return;
    }

    // 4) Envia o POST para /cadastro
    const resPost = await fetch("http://localhost:3333/cadastro", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email, senha })
    });
    const body = await resPost.json();

    if (!resPost.ok) {
      msg.textContent = body.message || "Erro no cadastro.";
      msg.style.color   = "red";
      return;
    }

    // 5) Sucesso: mostra mensagem e redireciona
    msg.textContent = "Cadastro realizado com sucesso!";
    msg.style.color   = "green";
    setTimeout(() => window.location.href = "login.html", 1000);

  } catch (err) {
    console.error(err);
    msg.textContent = "Ocorreu um erro. Tente novamente mais tarde.";
    msg.style.color   = "red";
  }
});

  const telefoneInput = document.getElementById("telefone");

  telefoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

    // Aplica a máscara: (XX) XXXXX-XXXX
    if (value.length >= 2 && value.length <= 6) {
      value = value.replace(/^(\d{2})(\d+)/g, "($1) $2");
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{5})(\d+)/g, "($1) $2-$3");
    }

    e.target.value = value;
  
});
