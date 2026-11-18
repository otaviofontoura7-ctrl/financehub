const router=require('express').Router();
const {autenticar,autorizar}=require('../middlewares/auth');
const {projetar}=require('../controllers/projecaoController');
router.get('/projecao',autenticar,autorizar('administrador'),projetar);
module.exports=router;
