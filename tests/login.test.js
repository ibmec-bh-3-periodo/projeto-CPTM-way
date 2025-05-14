// COMEÇO CÓDIGO DO LOGIN.JS

const loginFormElement = document.getElementById("loginForm");
if (loginFormElement) {
    loginFormElement.addEventListener("submit", function(event) {
        event.preventDefault(); 
        window.location.href = "home.html"; 
    });
}

function validateLogin() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    if (!emailInput || !passwordInput) {
        return "Preencha todos os campos";
    }
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
// FIM CODIGO DO LOGIN.JS

// EXPORTANTO FUNÇÕES PARA TESTES
window.validateLogin = validateLogin;
window.validateEmail = validateEmail;

describe('validateLogin()', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <input id="email" />
            <input id="password" />
        `;
    });

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            window.location.href = "home.html";
        });
    }

    test('retorna erro quando email e senha estão vazios', () => {
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        expect(window.validateLogin()).toBe('Preencha todos os campos');
    });

    test('retorna erro quando email está vazio', () => {
        document.getElementById('email').value = '';
        document.getElementById('password').value = 'abcdef';
        expect(window.validateLogin()).toBe('Preencha todos os campos');
    });

    test('retorna erro quando senha está vazia', () => {
        document.getElementById('email').value = 'user@example.com';
        document.getElementById('password').value = '';
        expect(window.validateLogin()).toBe('Preencha todos os campos');
    });

    test('retorna "Email inválido" para formato de email incorreto', () => {
        document.getElementById('email').value = 'user@';
        document.getElementById('password').value = 'abcdef';
        expect(window.validateLogin()).toBe('Email inválido');
    });

    test('retorna erro quando a senha tem menos de 6 caracteres', () => {
        document.getElementById('email').value = 'user@example.com';
        document.getElementById('password').value = '12345';
        expect(window.validateLogin()).toBe('A senha deve ter pelo menos 6 caracteres');
    });

    test('retorna true para credenciais válidas', () => {
        document.getElementById('email').value = 'user@example.com';
        document.getElementById('password').value = '123456';
        expect(window.validateLogin()).toBe(true);
    });
});
