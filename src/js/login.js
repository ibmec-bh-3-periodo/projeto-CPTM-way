const form = document.getElementById("loginForm")
const msg  = document.createElement("p")
msg.style.marginTop = "0.5rem"
form.appendChild(msg)

form.addEventListener("submit", async event => {
    event.preventDefault()

    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value

    if (!email || !password) {
        setMessage("Preencha todos os campos.", "red")
        return
    }
    if (!validateEmail(email)) {
        setMessage("Email inválido.", "red")
        return
    }
    if (password.length < 6) {
        setMessage("A senha deve ter pelo menos 6 caracteres.", "red")
        return
    }

    try {
        const res = await fetch("http://localhost:3333/usuarios")
        if (!res.ok) throw new Error("Falha ao buscar usuários")
        const usuarios = await res.json()

        const user = usuarios.find(u => u.email === email && u.senha === password)
        if (!user) {
            setMessage("Email ou senha incorretos.", "red")
            return
        }

        window.location.href = "home.html"

    } catch (err) {
        console.error(err)
        setMessage("Ocorreu um erro. Tente novamente mais tarde.", "red")
    }
})

function setMessage(text, color) {
    msg.textContent = text
    msg.style.color = color
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email.toLowerCase())
}