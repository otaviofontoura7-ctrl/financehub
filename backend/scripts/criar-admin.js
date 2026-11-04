require('dotenv').config();
const readline = require('readline');
const bcrypt = require('bcryptjs');
const pool = require('../database/conexao');
const { validarUsuario } = require('../middlewares/validacao');
async function perguntar(rl, q) { return new Promise(resolve => rl.question(q, resolve)); }
async function principal() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    console.log('Cadastro inicial do ADMINISTRADOR (execução local, não use senha de outro serviço).');
    const nome = (await perguntar(rl, 'Nome: ')).trim();
    const email = (await perguntar(rl, 'E-mail: ')).trim().toLowerCase();
    const senha = await perguntar(rl, 'Senha (será visível ao digitar; use local privado, mínimo 10 caracteres): ');
    const erro = validarUsuario({ nome, email, senha, perfil: 'administrador' });
    if (erro) throw new Error(erro);
    const [admins] = await pool.execute("SELECT COUNT(*) AS quantidade FROM usuarios WHERE perfil='administrador'");
    if (Number(admins[0].quantidade) > 0) throw new Error('Já existe administrador. Cadastre outros usuários pela área autenticada.');
    const senhaHash = await bcrypt.hash(senha, 12);
    await pool.execute('INSERT INTO usuarios (nome,email,senha_hash,perfil,ativo) VALUES (?,?,?,?,1)',[nome,email,senhaHash,'administrador']);
    console.log('Administrador criado. Faça login no navegador.');
  } catch(e) { console.error('Erro:', e.message); process.exitCode = 1; }
  finally { rl.close(); await pool.end(); }
}
principal();
