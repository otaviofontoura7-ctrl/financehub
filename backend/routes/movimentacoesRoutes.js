const router=require('express').Router();
const {autenticar,autorizar}=require('../middlewares/auth');
const c=require('../controllers/movimentacoesController');
router.use(autenticar);
router.get('/categorias',c.categorias);
for(const [rota,controller] of [['receitas',c.receitas],['despesas',c.despesas]]){
 router.get('/'+rota,controller.listar);
 router.post('/'+rota,controller.criar);
 router.put('/'+rota+'/:id',controller.atualizar);
 router.delete('/'+rota+'/:id',autorizar('administrador'),controller.excluir);
}
module.exports=router;
