const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    window.location.href = "home.html"; 
});

function validateLogin() {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (email === "" || password === "") {
        return "Preencha todos os campos";
    }

    if (!validateEmail(email)) {
        return "Email inválido";
    }

    if (password.length < 6) {
        return "A senha deve ter pelo menos 6 caracteres";
    }

    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}