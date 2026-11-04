require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const pool = require('./database/conexao');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32 || process.env.JWT_SECRET.startsWith('SUBSTITUA')) {
  console.error('Configure JWT_SECRET com pelo menos 32 caracteres aleatórios no arquivo .env.');
  process.exit(1);
}
const app = express();
const frontend = path.resolve(__dirname, '..', 'frontend');
app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '20kb' }));
app.use('/css', express.static(path.join(frontend,'css')));
app.use('/js', express.static(path.join(frontend,'js')));
app.get('/', (req,res) => res.sendFile(path.join(frontend, 'index.html')));
app.get('/dashboard', (req,res) => res.sendFile(path.join(frontend,'dashboard.html')));
app.get('/api/health', (req,res) => res.json({ status: 'ok', etapa: 2 }));
app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);
app.use((req,res) => res.status(404).json({ mensagem: 'Rota não encontrada.' }));
app.use((erro, req, res, next) => {
  console.error('Erro interno:', erro.message);
  res.status(500).json({ mensagem: 'Erro interno no servidor.' });
});
const porta = Number(process.env.PORT || 3000);
async function iniciar() {
  try {
    await pool.query('SELECT 1');
    app.listen(porta, () => console.log(`FinanceHub - Entrega 2 em http://localhost:${porta}`));
  } catch (erro) {
    console.error('Não foi possível conectar ao MySQL:', erro.message);
    process.exit(1);
  }
}
if (require.main === module) iniciar();
module.exports = app;
