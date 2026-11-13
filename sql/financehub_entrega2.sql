-- FINANCEHUB - ENTREGA 2 | MySQL 8
-- Seguro para executar novamente, sem DROP TABLE.
-- Se houver tabelas anteriores com outra estrutura, faça backup antes de executar.
CREATE DATABASE IF NOT EXISTS financehub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE financehub;
CREATE TABLE IF NOT EXISTS usuarios (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(150) NOT NULL,
 email VARCHAR(150) NOT NULL UNIQUE,
 senha_hash VARCHAR(255) NOT NULL,
 perfil ENUM('administrador','funcionario') NOT NULL DEFAULT 'funcionario',
 ativo BOOLEAN NOT NULL DEFAULT TRUE,
 criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS categorias (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 tipo ENUM('receita','despesa') NOT NULL,
 UNIQUE KEY uq_categoria_tipo (nome,tipo)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS receitas (
 id INT AUTO_INCREMENT PRIMARY KEY,
 descricao VARCHAR(255) NOT NULL,
 valor DECIMAL(12,2) NOT NULL,
 data_recebimento DATE NOT NULL,
 categoria_id INT NOT NULL,
 usuario_id INT NOT NULL,
 observacao TEXT,
 criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT chk_receita_valor CHECK(valor > 0),
 CONSTRAINT fk_receita_categoria FOREIGN KEY (categoria_id) REFERENCES categorias(id),
 CONSTRAINT fk_receita_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
 INDEX idx_receita_data (data_recebimento)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS despesas (
 id INT AUTO_INCREMENT PRIMARY KEY,
 descricao VARCHAR(255) NOT NULL,
 valor DECIMAL(12,2) NOT NULL,
 data_vencimento DATE NOT NULL,
 data_pagamento DATE NULL,
 status ENUM('pendente','paga') NOT NULL DEFAULT 'pendente',
 categoria_id INT NOT NULL,
 usuario_id INT NOT NULL,
 observacao TEXT,
 criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT chk_despesa_valor CHECK(valor > 0),
 CONSTRAINT chk_despesa_pagamento CHECK((status='pendente' AND data_pagamento IS NULL) OR (status='paga' AND data_pagamento IS NOT NULL)),
 CONSTRAINT fk_despesa_categoria FOREIGN KEY (categoria_id) REFERENCES categorias(id),
 CONSTRAINT fk_despesa_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
 INDEX idx_despesa_vencimento (data_vencimento)
) ENGINE=InnoDB;
INSERT IGNORE INTO categorias(nome,tipo) VALUES
('Vendas','receita'),('Prestação de serviços','receita'),('Outras receitas','receita'),
('Salários','despesa'),('Aluguel','despesa'),('Impostos','despesa'),
('Fornecedores','despesa'),('Marketing','despesa'),('Outras despesas','despesa');
SHOW TABLES;
