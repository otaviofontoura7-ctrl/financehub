const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../database/conexao');
const { validarUsuario } = require('../middlewares/validacao');
function publico(usuario) { return { id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil }; }
async function entrar(req, res, next) {
  try {
    const { email, senha } = req.body || {};
    if (typeof email !== 'string' || typeof senha !== 'string') return res.status(400).json({ mensagem: 'Informe e-mail e senha.' });
    const [lista] = await pool.execute('SELECT id, nome, email, senha_hash, perfil, ativo FROM usuarios WHERE email = ? LIMIT 1', [email.trim().toLowerCase()]);
    const usuario = lista[0];
    if (!usuario || !usuario.ativo || !(await bcrypt.compare(senha, usuario.senha_hash))) return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    const token = jwt.sign({ perfil: usuario.perfil }, process.env.JWT_SECRET, { subject: String(usuario.id), expiresIn: '2h', issuer: 'financehub', algorithm: 'HS256' });
    res.json({ token, usuario: publico(usuario), expiraEm: '2 horas' });
  } catch(e) { next(e); }
}
async function perfil(req, res, next) {
  try {
    const [lista] = await pool.execute('SELECT id, nome, email, perfil, ativo FROM usuarios WHERE id = ? LIMIT 1', [req.usuario.id]);
    const usuario = lista[0];
    if (!usuario || !usuario.ativo) return res.status(401).json({ mensagem: 'Usuário inativo ou não encontrado.' });
    res.json({ usuario: publico(usuario) });
  } catch(e) { next(e); }
}
async function registrar(req, res, next) {
  try {
    const { nome, email, senha, perfil: novoPerfil } = req.body || {};
    const perfil = novoPerfil || 'funcionario';
    const erro = validarUsuario({ nome, email, senha, perfil });
    if (erro) return res.status(400).json({ mensagem: erro });
    const senhaHash = await bcrypt.hash(senha, 12);
    const [resultado] = await pool.execute('INSERT INTO usuarios (nome, email, senha_hash, perfil, ativo) VALUES (?, ?, ?, ?, 1)', [nome.trim(), email.trim().toLowerCase(), senhaHash, perfil]);
    res.status(201).json({ mensagem: 'Usuário cadastrado.', usuario: { id: resultado.insertId, nome: nome.trim(), email: email.trim().toLowerCase(), perfil } });
  } catch(e) {
    if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ mensagem: 'E-mail já cadastrado.' });
    next(e);
  }
}
async function listar(req, res, next) {
  try {
    const [usuarios] = await pool.execute('SELECT id, nome, email, perfil, ativo, criado_em FROM usuarios ORDER BY id DESC');
    res.json({ usuarios });
  } catch(e) { next(e); }
}
module.exports = { entrar, perfil, registrar, listar };
