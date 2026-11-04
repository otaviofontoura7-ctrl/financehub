const test = require('node:test');
const assert = require('node:assert/strict');
const { validarUsuario } = require('../middlewares/validacao');
test('aceita um usuário válido', () => assert.equal(validarUsuario({ nome:'Funcionário Teste', email:'funcionario@example.com', senha:'uma-senha-longa', perfil:'funcionario' }), null));
test('rejeita e-mail inválido', () => assert.equal(validarUsuario({ nome:'Funcionário Teste', email:'invalido', senha:'uma-senha-longa', perfil:'funcionario' }), 'E-mail inválido.'));
test('rejeita perfil diferente dos dois níveis', () => assert.equal(validarUsuario({ nome:'Funcionário Teste', email:'funcionario@example.com', senha:'uma-senha-longa', perfil:'gerente' }), 'Perfil inválido.'));
