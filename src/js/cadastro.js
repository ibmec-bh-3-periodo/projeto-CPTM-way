const form = document.getElementById("cadastroForm");
const msg  = document.createElement("p");
msg.style.marginTop = "0.5rem";
form.appendChild(msg);

form.addEventListener("submit", async event => {
  event.preventDefault();

  const nome = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const confirmarEmail = document.getElementById("confirmEmail").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmSenha").value;
  const telefone = document.getElementById("telefone").value.trim();

  // Validações básicas
  if (!email || !confirmarEmail || !senha || !confirmarSenha || !telefone) {
    setMessage("Preencha todos os campos.", "red");
    return;
  }

  if (!validateEmail(email)) {
    setMessage("E-mail inválido.", "red");
    return;
  }

  if (!validateTelefone(telefone)) {
    setMessage("Telefone inválido.", "red");
    return;
  }

  if (email !== confirmarEmail) {
    setMessage("Os e-mails não coincidem.", "red");
    return;
  }

  if (senha.length < 6) {
    setMessage("A senha deve ter pelo menos 6 caracteres.", "red");
    return;
  }

  if (senha !== confirmarSenha) {
    setMessage("As senhas não coincidem.", "red");
    return;
  }

  try {
    // 3) Busca todos os usuários para verificar duplicidade
    const resGet = await fetch("http://localhost:3333/usuarios");
    if (!resGet.ok) throw new Error("Falha ao buscar usuários");
    const usuarios = await resGet.json();

    if (usuarios.some(u => u.email === email)) {
      setMessage("Este e-mail já está cadastrado.", "red");
      return;
    }
    if (usuarios.some(u => u.telefone === telefone)) {
      setMessage("Este telefone já está cadastrado.", "red");
      return;
    }

    // Envia cadastro
    const resPost = await fetch("http://localhost:3333/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, telefone, email, senha })
    });
    const body = await resPost.json();

    if (!resPost.ok) {
      setMessage(body.message || "Erro no cadastro.", "red");
      return;
    }
  
    window.location.href = "login.html"
    //setMessage("Cadastro realizado com sucesso! Redirecionando...", "green");

  } catch (err) {
    console.error(err);
    setMessage("Ocorreu um erro. Tente novamente mais tarde.", "red");
  }
});

function setMessage(text, color) {
  msg.textContent = text;
  msg.style.color = color;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

function validateTelefone(telefone) {
  const re = /^\(\d{2}\) \d{5}-\d{4}$/;
  return re.test(telefone);
}

const telefoneInput = document.getElementById("telefone");

telefoneInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "");

  if (value.length > 11) value = value.slice(0, 11);
    if (value.length >= 2 && value.length <= 6) {
      value = value.replace(/^(\d{2})(\d+)/g, "($1) $2");
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{5})(\d+)/g, "($1) $2-$3");
    }

    e.target.value = value;
});
