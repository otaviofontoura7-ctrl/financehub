const jwt = require('jsonwebtoken');
const pool = require('../database/conexao');
async function autenticar(req, res, next) {
  const header = req.headers.authorization || '';
  const partes = header.split(' ');
  if (partes.length !== 2 || partes[0] !== 'Bearer' || !partes[1]) {
    return res.status(401).json({ mensagem: 'Token de acesso ausente.' });
  }
  try {
    const payload = jwt.verify(partes[1], process.env.JWT_SECRET, { algorithms: ['HS256'], issuer: 'financehub' });
    if (!payload.sub || !['administrador', 'funcionario'].includes(payload.perfil)) throw new Error('Token inválido');
    const [usuarios] = await pool.execute('SELECT id, perfil, ativo FROM usuarios WHERE id = ? LIMIT 1', [Number(payload.sub)]);
    if (!usuarios[0] || !usuarios[0].ativo || usuarios[0].perfil !== payload.perfil) return res.status(401).json({ mensagem: 'Sessão inválida. Entre novamente.' });
    req.usuario = { id: Number(payload.sub), perfil: usuarios[0].perfil };
    next();
  } catch (_) { return res.status(401).json({ mensagem: 'Token inválido ou expirado.' }); }
}
function autorizar(...perfis) {
  return (req, res, next) => {
    if (!req.usuario || !perfis.includes(req.usuario.perfil)) return res.status(403).json({ mensagem: 'Acesso não permitido para seu perfil.' });
    next();
  };
}
module.exports = { autenticar, autorizar };
