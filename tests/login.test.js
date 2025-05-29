// COMEÇO CÓDIGO DO LOGIN.JS
const users = require(path.join(__dirname, 'db/users_db.json')).flatMap(item =>
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

    test('retorna erro quando email ou senha não correspondem com um usuário existente no users.json', () => {
        document.getElementById('email').value = 'invalid@example.com';
        document.getElementById('password').value = 'wrongpassword';
        expect(window.validateLogin()).toBe('Email ou senha incorretos');
    });

    test('retorna true quando email e senha correspondem com um usuário existente no users.json', () => {
        document.getElementById('email').value = 'marcelovazdemelocastro@gmail.com';
        document.getElementById('password').value = '12345678';
        expect(window.validateLogin()).toBe(true);
    });
});
