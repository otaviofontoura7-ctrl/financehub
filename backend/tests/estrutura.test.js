const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

test('página inicial possui login real e script de autenticação', () => {
  const index = read('frontend/index.html');
  for (const id of ['loginForm', 'loginError', 'email', 'password']) {
    assert.match(index, new RegExp(`id=["']${id}["']`));
  }
  assert.match(index, /<script[^>]*src=["']\/js\/login\.js["']/);
  assert.doesNotMatch(index, /href=["']\/dashboard["']/);
});

test('tela CRUD possui formulários, tabelas e scripts de Fetch', () => {
  const html = read('frontend/dashboard.html');
  for (const id of ['movForm', 'newReceita', 'newDespesa', 'receitaRows', 'despesaRows', 'logoutButton']) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.match(html, /\/js\/financeiro\.js/);
  assert.match(html, /\/js\/auth-dashboard\.js/);
});

test('scripts SQL recriam banco com as quatro tabelas e migração', () => {
  const schema = read('sql/financehub_entrega2.sql');
  const migration = read('sql/financehub_entrega3_migracao.sql');
  for (const table of ['usuarios','categorias','receitas','despesas']) {
    assert.match(schema, new RegExp(`CREATE TABLE IF NOT EXISTS ${table}`));
  }
  assert.match(schema, /FOREIGN KEY/);
  assert.match(migration, /forma_pagamento/);
});

test('repositório ignora credenciais locais e dependências', () => {
  const ignore = read('.gitignore');
  assert.match(ignore, /^\.env$/m);
  assert.match(ignore, /^node_modules\/$/m);
});
