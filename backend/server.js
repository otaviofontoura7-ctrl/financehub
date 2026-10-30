const express = require('express');
const path = require('path');
const app = express();
const frontend = path.join(__dirname, '..', 'frontend');
app.use(express.json());
app.use(express.static(frontend));
app.get('/api/health', (req, res) => res.json({ status: 'ok', etapa: 1, modo: 'prototipo' }));
app.get('/dashboard', (req, res) => res.sendFile(path.join(frontend, 'dashboard.html')));
app.listen(3000, () => console.log('FinanceHub - Entrega 1: http://localhost:3000'));
