const sections={visao:['Visão geral','Indicadores reais do período selecionado'],receitas:['Receitas','Controle de recebimentos e formas de pagamento'],despesas:['Despesas','Pagamentos realizados e compromissos futuros'],impostos:['Impostos','Tributos registrados nas despesas'],fluxo:['Fluxo de caixa','Entradas e saídas realizadas'],projecao:['Projeção','Estimativa de 30 dias com metodologia explícita'],usuarios:['Usuários','Gerenciamento de contas']};
const money=x=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(x||0));
const fmtDate=s=>s?String(s).slice(8,10)+'/'+String(s).slice(5,7)+'/'+String(s).slice(0,4):'—';
const el=id=>document.getElementById(id);
const state={categorias:[],receita:[],despesa:[],perfil:null};
const today=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};
const firstDay=()=>today().slice(0,7)+'-01';
function setText(node,v){node.textContent=v;}
function td(tr,s){const d=document.createElement('td');d.textContent=s;tr.append(d);return d;}
function showPage(section){if(!sections[section]||!el(section))section='visao';document.querySelectorAll('.view').forEach(x=>x.classList.toggle('active',x.id===section));document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('active',x.dataset.section===section));setText(el('heading'),sections[section][0]);setText(el('breadcrumb'),sections[section][0].toUpperCase());setText(el('subheading'),sections[section][1]);}
document.querySelectorAll('.nav').forEach(a=>a.addEventListener('click',()=>showPage(a.dataset.section)));
window.addEventListener('hashchange',()=>showPage(location.hash.slice(1)));
async function api(url,options={}){const r=await protectedFetch(url,options);let out={};try{out=await r.json()}catch{}if(!r.ok)throw new Error(out.mensagem||`Erro ${r.status}`);return out;}
function rowButton(row,label,handler){const b=document.createElement('button');b.type='button';b.className='mini-btn';b.textContent=label;b.addEventListener('click',handler);row.append(b);}
async function loadCategories(){const r=await api('/api/categorias');state.categorias=r.categorias;}
async function loadData(tipo){try{const rows=(await api('/api/'+(tipo==='receita'?'receitas':'despesas'))).registros;state[tipo]=rows;renderRows(tipo)}catch(e){el(tipo+'Feedback').textContent=e.message;}}
function renderRows(tipo){const rows=el(tipo+'Rows');rows.replaceChildren();const regs=state[tipo];if(!regs.length){const tr=document.createElement('tr');const c=td(tr,'Nenhuma movimentação cadastrada.');c.colSpan=tipo==='receita'?6:7;rows.append(tr);return;}
for(const r of regs){const tr=document.createElement('tr');td(tr,r.descricao);if(tipo==='receita'){td(tr,fmtDate(r.data_recebimento));td(tr,({pix:'Pix',cartao:'Cartão',dinheiro:'Dinheiro',outros:'Outros'})[r.forma_pagamento]||'Outros');td(tr,r.categoria);td(tr,money(r.valor))}else{td(tr,fmtDate(r.data_vencimento));td(tr,fmtDate(r.data_pagamento));td(tr,r.status==='paga'?'Paga':'Pendente');td(tr,r.categoria);td(tr,money(r.valor))}const actions=document.createElement('td');if(state.perfil==='administrador'||r.usuario_id===window.financehubUser?.id)if(state.perfil==='administrador'||Number(r.usuario_id)===Number(window.financehubUser?.id))rowButton(actions,'Editar',()=>openForm(tipo,r));if(state.perfil==='administrador')rowButton(actions,'Excluir',()=>deleteRow(tipo,r));tr.append(actions);rows.append(tr);}}
function openForm(tipo,r=null){const f=el('movForm');f.reset();f.elements.id.value=r?.id||'';f.elements.tipo.value=tipo;el('movTitle').textContent=(r?'Editar ':'Nova ')+(tipo==='receita'?'receita':'despesa');el('receitaFields').hidden=tipo!=='receita';el('despesaFields').hidden=tipo!=='despesa';f.elements.data_recebimento.required=tipo==='receita';f.elements.data_vencimento.required=tipo==='despesa';f.elements.categoria_id.replaceChildren();for(const c of state.categorias.filter(c=>c.tipo===tipo)){const opt=document.createElement('option');opt.value=c.id;opt.textContent=c.nome;f.elements.categoria_id.append(opt)}
if(!f.elements.categoria_id.options.length){alert('Nenhuma categoria cadastrada no banco. Execute o script SQL da Entrega 2.');return;}
if(r){for(const k of ['descricao','valor','categoria_id','observacao','data_recebimento','forma_pagamento','data_vencimento','data_pagamento','status']){if(f.elements[k] && r[k]!=null)f.elements[k].value=r[k]}}else{f.elements.data_recebimento.value=today();f.elements.data_vencimento.value=today()}
togglePaymentDate();el('movError').textContent='';el('movDialog').showModal()}
function togglePaymentDate(){const paid=el('movForm').elements.status.value==='paga';el('paymentDateLabel').hidden=!paid;el('movForm').elements.data_pagamento.required=paid;if(!paid)el('movForm').elements.data_pagamento.value='';else if(!el('movForm').elements.data_pagamento.value)el('movForm').elements.data_pagamento.value=today()}
el('expenseStatus').addEventListener('change',togglePaymentDate);el('newReceita').addEventListener('click',()=>openForm('receita'));el('newDespesa').addEventListener('click',()=>openForm('despesa'));el('closeDialog').addEventListener('click',()=>el('movDialog').close());
el('movForm').addEventListener('submit',async e=>{e.preventDefault();const f=e.currentTarget;const b=Object.fromEntries(new FormData(f));const {id,tipo}=b;delete b.id;delete b.tipo;if(tipo==='receita'){delete b.data_vencimento;delete b.data_pagamento;delete b.status;}else{delete b.data_recebimento;delete b.forma_pagamento;if(b.status==='pendente')b.data_pagamento=null;}
try{const url='/api/'+(tipo==='receita'?'receitas':'despesas')+(id?'/'+id:'');await api(url,{method:id?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b)});el('movDialog').close();el(tipo+'Feedback').textContent='Registro salvo com sucesso.';await loadData(tipo);if(state.perfil==='administrador')await loadSummary();}catch(err){el('movError').textContent=err.message;}});
async function deleteRow(tipo,r){if(!confirm(`Excluir definitivamente "${r.descricao}"?`))return;try{await api('/api/'+(tipo==='receita'?'receitas':'despesas')+'/'+r.id,{method:'DELETE'});el(tipo+'Feedback').textContent='Registro excluído.';await loadData(tipo);if(state.perfil==='administrador')await loadSummary();}catch(e){el(tipo+'Feedback').textContent=e.message}}
async function loadSummary(){if(state.perfil!=='administrador')return;const inicio=el('dateStart').value,fim=el('dateEnd').value;try{const d=await api('/api/indicadores?'+new URLSearchParams({inicio,fim}));el('sumReceitas').textContent=money(d.entradas);el('sumDespesas').textContent=money(d.saidas);el('sumResultado').textContent=money(d.resultado);el('sumResultado').className=d.resultado>=0?'positive':'negative';el('sumImpostos').textContent=money(d.impostos);const bars=el('dailyBars');bars.replaceChildren();const max=Math.max(1,...d.dias.map(x=>Number(x.total)));for(const day of d.dias){const col=document.createElement('div');col.className='bar-col';const val=document.createElement('b');val.textContent=money(day.total);const bar=document.createElement('div');bar.className='bar';bar.style.height=(12+Math.round(Number(day.total)/max*125))+'px';const dt=document.createElement('small');dt.textContent=fmtDate(day.dia).slice(0,5);col.append(val,bar,dt);bars.append(col)}if(!d.dias.length)bars.textContent='Nenhuma receita no período.';const methods=el('paymentLegend');methods.replaceChildren();const map={pix:'Pix',cartao:'Cartão',dinheiro:'Dinheiro',outros:'Outros'};for(const p of d.porPagamento){const div=document.createElement('div');div.className='payment-line';div.textContent=`${map[p.forma_pagamento]||p.forma_pagamento}: ${money(p.total)}`;methods.append(div)}if(!d.porPagamento.length)methods.textContent='Nenhuma entrada no período.';}catch(e){el('summaryContent').textContent='Não foi possível carregar os indicadores: '+e.message;}}
el('applyDates').addEventListener('click',loadSummary);
el('dateStart').value=firstDay();el('dateEnd').value=today();
document.addEventListener('financehub:ready',async event=>{state.perfil=event.detail.perfil;if(state.perfil!=='administrador'){el('summaryContent').hidden=true;el('summaryAccessNote').hidden=false;}
try{await loadCategories();await Promise.all([loadData('receita'),loadData('despesa')]);await loadSummary()}catch(e){console.error(e)}showPage(location.hash.slice(1));});


async function loadForecast(){
  const root=document.getElementById('forecastContent');
  if(!root || state.perfil!=='administrador')return;
  try {
    const d=await api('/api/projecao');
    root.replaceChildren();
    const summary=document.createElement('div');summary.className='stats';
    for(const [label,value] of [['Receita estimada (próx. 30 dias)',d.receitaEstimada],['Contas a vencer (próx. 30 dias)',d.despesasPrevistas],['Saldo estimado',d.saldoEstimado]]){
      const article=document.createElement('article');article.className='stat';
      const t=document.createElement('div');t.className='stat-head';t.textContent=label;
      const n=document.createElement('strong');n.textContent=money(value);
      article.append(t,n);summary.append(article);
    }
    const explanation=document.createElement('p');explanation.className='note';explanation.textContent=d.metodologia;
    root.append(summary,explanation);
  }catch(err){root.textContent='Erro ao consultar projeção: '+err.message;}
}
document.addEventListener('financehub:ready', loadForecast);
