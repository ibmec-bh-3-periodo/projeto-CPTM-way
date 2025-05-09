const path = require('./cadastro.js');

/**
 * @jest-environment jsdom
 */

describe('cadastro.js form submission', () => {
    let form;
    let emailInput;
    let confirmarEmailInput;
    let senhaInput;
    let confirmarSenhaInput;
    let msgEl;

    beforeEach(() => {
        // Reset modules so cadastro.js re-runs its initialization
        jest.resetModules();

        // Set up our document body
        document.body.innerHTML = `
            <form id="cadastroForm">
                <input id="email" />
                <input id="confirmarEmail" />
                <input id="senha" />
                <input id="confirmarSenha" />
            </form>
        `;

        // Grab elements
        form = document.getElementById('cadastroForm');
        emailInput = document.getElementById('email');
        confirmarEmailInput = document.getElementById('confirmarEmail');
        senhaInput = document.getElementById('senha');
        confirmarSenhaInput = document.getElementById('confirmarSenha');

        // Mock alert and window.location
        window.alert = jest.fn();
        delete window.location;
        window.location = { href: '' };

        // Clear localStorage
        localStorage.clear();

        // Load the script under test
        require(path.resolve(__dirname, '../src/js/cadastro.js'));

        // The script appends a <p> for messages
        msgEl = form.querySelector('p');
    });

    function submitForm() {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }

    test('shows error when emails do not match', () => {
        emailInput.value = 'a@x.com';
        confirmarEmailInput.value = 'b@y.com';
        senhaInput.value = '1234';
        confirmarSenhaInput.value = '1234';

        submitForm();

        expect(msgEl.textContent).toBe('Os e-mails não coincidem.');
        expect(msgEl.style.color).toBe('red');
    });

    test('shows error when passwords do not match', () => {
        emailInput.value = 'user@site.com';
        confirmarEmailInput.value = 'user@site.com';
        senhaInput.value = 'pass1';
        confirmarSenhaInput.value = 'pass2';

        submitForm();

        expect(msgEl.textContent).toBe('As senhas não coincidem.');
        expect(msgEl.style.color).toBe('red');
    });

    test('shows error when required fields are empty', () => {
        emailInput.value = '';
        confirmarEmailInput.value = '';
        senhaInput.value = '';
        confirmarSenhaInput.value = '';

        submitForm();

        expect(msgEl.textContent).toBe('Preencha todos os campos.');
        expect(msgEl.style.color).toBe('red');
    });

    test('shows error when email is already registered', () => {
        // Pre-populate localStorage
        const existing = [{ email: 'dup@site.com', password: 'pwd' }];
        localStorage.setItem('users', JSON.stringify(existing));

        emailInput.value = 'dup@site.com';
        confirmarEmailInput.value = 'dup@site.com';
        senhaInput.value = 'pwd';
        confirmarSenhaInput.value = 'pwd';

        submitForm();

        expect(msgEl.textContent).toBe('Este e-mail já está cadastrado.');
        expect(msgEl.style.color).toBe('red');
    });

    test('successful registration stores user, alerts and redirects', () => {
        emailInput.value = 'new@user.com';
        confirmarEmailInput.value = 'new@user.com';
        senhaInput.value = 'secret';
        confirmarSenhaInput.value = 'secret';

        submitForm();

        // localStorage should now have one user
        const users = JSON.parse(localStorage.getItem('users'));
        expect(users).toHaveLength(1);
        expect(users[0]).toMatchObject({ email: 'new@user.com', password: 'secret' });

        // alert should be called
        expect(window.alert).toHaveBeenCalledWith('Cadastro realizado com sucesso!');

        // redirected to login.html
        expect(window.location.href).toBe('login.html');
    });
});