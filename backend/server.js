const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.get('/api/health', (req, res) => res.json({status:'ok', etapa:1, modo:'demonstracao'}));
app.listen(3000, () => console.log('FinanceHub em http://localhost:3000'));
