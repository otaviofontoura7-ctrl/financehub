const pool = require('../database/conexao');
const {validarMovimento,podeAlterar,intervaloValido} = require('../services/financeiro');
const T={receita:{tabela:'receitas',data:'data_recebimento'},despesa:{tabela:'despesas',data:'data_vencimento'}};
const SELECT={receita:'r.id, r.descricao, r.valor, DATE_FORMAT(r.data_recebimento, "%Y-%m-%d") AS data_recebimento, r.forma_pagamento, r.categoria_id, c.nome AS categoria, r.usuario_id, r.observacao',despesa:'r.id, r.descricao, r.valor, DATE_FORMAT(r.data_vencimento, "%Y-%m-%d") AS data_vencimento, DATE_FORMAT(r.data_pagamento, "%Y-%m-%d") AS data_pagamento, r.status, r.categoria_id, c.nome AS categoria, r.usuario_id, r.observacao'};
const fail=(res,e)=>res.status(400).json({mensagem:e});
async function categoriaExiste(id,tipo) { const [r]=await pool.execute('SELECT id FROM categorias WHERE id=? AND tipo=? LIMIT 1',[Number(id),tipo]);return !!r.length; }
function idValido(id){return /^\d+$/.test(String(id)) && Number.isSafeInteger(Number(id)) && Number(id)>0;}
function normalizar(tipo,b){return tipo==='receita'?{descricao:b.descricao.trim(),valor:Number(b.valor).toFixed(2),data_recebimento:b.data_recebimento,forma_pagamento:b.forma_pagamento,categoria_id:Number(b.categoria_id),observacao:b.observacao?.trim()||null}:{descricao:b.descricao.trim(),valor:Number(b.valor).toFixed(2),data_vencimento:b.data_vencimento,data_pagamento:b.status==='paga'?b.data_pagamento:null,status:b.status,categoria_id:Number(b.categoria_id),observacao:b.observacao?.trim()||null};}
function criarController(tipo){
 const tabela=T[tipo].tabela; const data=T[tipo].data;
 return {
 async listar(req,res,next){try{
   const {inicio,fim}=req.query;const filtro=inicio!=null||fim!=null;
   if(filtro&&!intervaloValido(inicio,fim))return fail(res,'Período inválido.');
   let sql=`SELECT ${SELECT[tipo]} FROM ${tabela} r JOIN categorias c ON c.id=r.categoria_id`;
   const args=[];
   if(filtro){sql+=` WHERE r.${data} BETWEEN ? AND ?`;args.push(inicio,fim);}
   sql+=` ORDER BY r.${data} DESC, r.id DESC LIMIT 500`;
   const [registros]=await pool.execute(sql,args);res.json({registros});
  }catch(e){next(e)}},
 async criar(req,res,next){try{
   const erro=validarMovimento(tipo,req.body);if(erro)return fail(res,erro);
   if(!await categoriaExiste(req.body.categoria_id,tipo))return fail(res,'Categoria não pertence ao tipo de movimentação.');
   const b=normalizar(tipo,req.body);let sql,args;
   if(tipo==='receita'){
    sql='INSERT INTO receitas (descricao,valor,data_recebimento,forma_pagamento,categoria_id,usuario_id,observacao) VALUES (?,?,?,?,?,?,?)';args=[b.descricao,b.valor,b.data_recebimento,b.forma_pagamento,b.categoria_id,req.usuario.id,b.observacao];
   }else{
    sql='INSERT INTO despesas (descricao,valor,data_vencimento,data_pagamento,status,categoria_id,usuario_id,observacao) VALUES (?,?,?,?,?,?,?,?)';args=[b.descricao,b.valor,b.data_vencimento,b.data_pagamento,b.status,b.categoria_id,req.usuario.id,b.observacao];
   }
   const [r]=await pool.execute(sql,args);res.status(201).json({mensagem:'Registro criado.',id:r.insertId});
  }catch(e){next(e)}},
 async atualizar(req,res,next){try{
   if(!idValido(req.params.id))return fail(res,'ID inválido.');
   const erro=validarMovimento(tipo,req.body);if(erro)return fail(res,erro);
   if(!await categoriaExiste(req.body.categoria_id,tipo))return fail(res,'Categoria não pertence ao tipo de movimentação.');
   const [rows]=await pool.execute(`SELECT usuario_id FROM ${tabela} WHERE id=? LIMIT 1`,[Number(req.params.id)]);
   if(!rows.length)return res.status(404).json({mensagem:'Registro não encontrado.'});
   if(!podeAlterar(req.usuario,rows[0].usuario_id))return res.status(403).json({mensagem:'Você só pode editar seus próprios registros.'});
   const b=normalizar(tipo,req.body);let sql,args;
   if(tipo==='receita'){
    sql='UPDATE receitas SET descricao=?,valor=?,data_recebimento=?,forma_pagamento=?,categoria_id=?,observacao=? WHERE id=?';args=[b.descricao,b.valor,b.data_recebimento,b.forma_pagamento,b.categoria_id,b.observacao,Number(req.params.id)];
   }else{
    sql='UPDATE despesas SET descricao=?,valor=?,data_vencimento=?,data_pagamento=?,status=?,categoria_id=?,observacao=? WHERE id=?';args=[b.descricao,b.valor,b.data_vencimento,b.data_pagamento,b.status,b.categoria_id,b.observacao,Number(req.params.id)];
   }
   await pool.execute(sql,args);res.json({mensagem:'Registro atualizado.'});
  }catch(e){next(e)}},
 async excluir(req,res,next){try{
   if(!idValido(req.params.id))return fail(res,'ID inválido.');
   const [r]=await pool.execute(`DELETE FROM ${tabela} WHERE id=?`,[Number(req.params.id)]);
   if(!r.affectedRows)return res.status(404).json({mensagem:'Registro não encontrado.'});
   res.json({mensagem:'Registro excluído.'});
  }catch(e){next(e)}}
 };
}
async function categorias(req,res,next){try{const [categorias]=await pool.execute('SELECT id,nome,tipo FROM categorias ORDER BY tipo,nome');res.json({categorias});}catch(e){next(e)}}
module.exports={receitas:criarController('receita'),despesas:criarController('despesa'),categorias};
