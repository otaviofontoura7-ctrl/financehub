const router = require('express').Router();
const { autenticar, autorizar } = require('../middlewares/auth');
const pool = require('../database/conexao');
router.get('/status', autenticar, async (req, res, next) => {
  try { const [r] = await pool.execute('SELECT DATABASE() AS banco'); res.json({ mensagem:'Acesso autenticado', banco:r[0].banco, etapa:2 }); }
  catch(e) { next(e); }
});
router.get('/gerencia', autenticar, autorizar('administrador'), (req, res) => res.json({ mensagem: 'Área de administrador autorizada.' }));
module.exports = router;
