function validarUsuario({ nome, email, senha, perfil }) {
  if (typeof nome !== 'string' || nome.trim().length < 3 || nome.trim().length > 150) return 'Nome deve ter de 3 a 150 caracteres.';
  if (typeof email !== 'string' || email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'E-mail inválido.';
  if (typeof senha !== 'string' || senha.length < 10 || senha.length > 72) return 'Senha deve ter de 10 a 72 caracteres.';
  if (!['administrador','funcionario'].includes(perfil)) return 'Perfil inválido.';
  return null;
}
module.exports = { validarUsuario };
