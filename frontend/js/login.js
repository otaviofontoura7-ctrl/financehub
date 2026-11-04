const form = document.getElementById('loginForm');
const erro = document.getElementById('loginError');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  erro.hidden = true;
  const button = form.querySelector('button');
  button.disabled = true;
  try {
    const resposta = await fetch('/api/auth/login', {
      method: 'POST', headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ email:document.getElementById('email').value, senha:document.getElementById('password').value })
    });
    const dados = await resposta.json();
    if (!resposta.ok) throw new Error(dados.mensagem || 'Não foi possível entrar.');
    sessionStorage.setItem('financehub_jwt', dados.token);
    window.location.replace('/dashboard');
  } catch(e) { erro.textContent = e.message; erro.hidden = false; }
  finally { button.disabled = false; }
});
