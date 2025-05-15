/**
 * @jest-environment jsdom
 */

describe('Formulário de Cadastro', () => {  
  beforeEach(() => {
    // Recarrega o módulo e reseta módulos
    jest.resetModules();
    jest.useFakeTimers();

    // Monta estrutura de DOM
    document.body.innerHTML = `
      <form id="cadastroForm">
        <input type="email" id="email" />
        <input type="email" id="confirmEmail" />
        <input type="password" id="senha" />
        <input type="password" id="confirmSenha" />
        <button id="button2" type="submit"></button>
      </form>
    `;

    // Limpa localStorage
    localStorage.clear();

    // Mock alert
    window.alert = jest.fn();

    // Mock window.location.href
    delete window.location;
    window.location = { href: '' };

    // Carrega o script após o DOM estar pronto
    require('../src/js/cadastro.js');
  });

  test('exibe erro ao submeter com campos vazios', () => {
    const form = document.getElementById('cadastroForm');
    const msg = form.querySelector('p');

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(msg.textContent).toBe('Preencha todos os campos.');
    expect(msg.style.color).toBe('red');
    expect(localStorage.getItem('users')).toBeNull();
  });

  test('exibe erro quando e-mails não coincidem', () => {
    const form = document.getElementById('cadastroForm');
    document.getElementById('email').value = 'a@b.com';
    document.getElementById('confirmEmail').value = 'c@d.com';
    document.getElementById('senha').value = '1234';
    document.getElementById('confirmSenha').value = '1234';
    const msg = form.querySelector('p');

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(msg.textContent).toBe('Os e-mails não coincidem.');
    expect(msg.style.color).toBe('red');
  });

  test('exibe erro quando senhas não coincidem', () => {
    const form = document.getElementById('cadastroForm');
    document.getElementById('email').value = 'a@b.com';
    document.getElementById('confirmEmail').value = 'a@b.com';
    document.getElementById('senha').value = '1234';
    document.getElementById('confirmSenha').value = '5678';
    const msg = form.querySelector('p');

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(msg.textContent).toBe('As senhas não coincidem.');
    expect(msg.style.color).toBe('red');
  });

  test('exibe erro quando e-mail já existe', () => {
    // Pré-cadastra um usuário no localStorage
    localStorage.setItem('users', JSON.stringify([{ email: 'a@b.com', password: '0000' }]));

    const form = document.getElementById('cadastroForm');
    document.getElementById('email').value = 'a@b.com';
    document.getElementById('confirmEmail').value = 'a@b.com';
    document.getElementById('senha').value = '1234';
    document.getElementById('confirmSenha').value = '1234';
    const msg = form.querySelector('p');

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(msg.textContent).toBe('Este e-mail já está cadastrado.');
    expect(msg.style.color).toBe('red');
  });

  test('cadastra com sucesso e redireciona após 1s', () => {
    const form = document.getElementById('cadastroForm');
    document.getElementById('email').value = 'novo@dominio.com';
    document.getElementById('confirmEmail').value = 'novo@dominio.com';
    document.getElementById('senha').value = 'senha123';
    document.getElementById('confirmSenha').value = 'senha123';
    const msg = form.querySelector('p');

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    // Feedback instantâneo
    expect(msg.textContent).toBe('Cadastro realizado com sucesso!');
    expect(msg.style.color).toBe('green');

    // Usuário armazenado
    const users = JSON.parse(localStorage.getItem('users'));
    expect(users).toEqual([{ email: 'novo@dominio.com', password: 'senha123' }]);

    // Simula o timer de redirecionamento
    jest.runAllTimers();
    expect(window.location.href).toBe('login.html');
  });
});
