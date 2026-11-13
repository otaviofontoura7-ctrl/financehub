const router=require('express').Router();
const {autenticar,autorizar}=require('../middlewares/auth');
const {painel}=require('../controllers/indicadoresController');
router.get('/indicadores',autenticar,autorizar('administrador'),painel);
module.exports=router;
