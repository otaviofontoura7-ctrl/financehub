const token = sessionStorage.getItem('financehub_jwt');
if (!token) window.location.replace('/');
const headers = () => ({ Authorization: `Bearer ${sessionStorage.getItem('financehub_jwt')}` });
async function protectedFetch(url, options={}) {
  const r=await fetch(url, {...options, headers: {...headers(),...(options.headers||{})}});
  if (r.status===401) { sessionStorage.removeItem('financehub_jwt'); window.location.replace('/'); throw new Error('Sessão expirada'); }
  return r;
}
async function listarUsuarios() {
  const r=await protectedFetch('/api/auth/usuarios');
  if (!r.ok) return;
  const {usuarios}=await r.json();
  const root=document.getElementById('usersTable');
  root.replaceChildren();
  const tabela=document.createElement('table');
  const cab=document.createElement('thead');
  const tr=document.createElement('tr');
  ['Nome','E-mail','Perfil','Ativo'].forEach(t=>{const th=document.createElement('th');th.textContent=t;tr.append(th);});
  cab.append(tr);tabela.append(cab);
  const corpo=document.createElement('tbody');
  usuarios.forEach(u=>{const linha=document.createElement('tr');[u.nome,u.email,u.perfil,u.ativo?'Sim':'Não'].forEach(t=>{const td=document.createElement('td');td.textContent=t;linha.append(td);});corpo.append(linha);});
  tabela.append(corpo);root.append(tabela);
}
(async () => {
  try {
    const r=await protectedFetch('/api/auth/me');
    if (!r.ok) throw new Error('Sessão inválida');
    const {usuario}=await r.json();
    document.getElementById('accountName').textContent=usuario.nome;
    document.getElementById('accountRole').textContent=usuario.perfil;
    if (usuario.perfil==='administrador') {
      document.getElementById('usersNav').hidden=false;
      await listarUsuarios();
    } else {
      document.getElementById('usuarios').remove();
    }
    document.body.style.visibility='visible';
  } catch(e) { sessionStorage.removeItem('financehub_jwt');window.location.replace('/'); }
})();
document.getElementById('logoutButton').addEventListener('click',()=>{sessionStorage.removeItem('financehub_jwt');window.location.replace('/');});
document.getElementById('registerForm').addEventListener('submit', async e=>{
 e.preventDefault(); const f=e.currentTarget;const feedback=document.getElementById('registerFeedback');
 try {const data=Object.fromEntries(new FormData(f));const r=await protectedFetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const result=await r.json(); feedback.textContent=result.mensagem || 'Erro'; if(r.ok){f.reset();await listarUsuarios();}}
 catch(e){feedback.textContent=e.message;}
});
