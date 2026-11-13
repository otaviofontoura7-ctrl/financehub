-- FINANCEHUB - ENTREGA 3 | Execute depois de sql/financehub_entrega2.sql
-- Atualização incremental: NÃO exclui dados existentes.
USE financehub;
DELIMITER $$
DROP PROCEDURE IF EXISTS migrar_financehub_entrega3 $$
CREATE PROCEDURE migrar_financehub_entrega3()
BEGIN
 IF NOT EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='receitas' AND COLUMN_NAME='forma_pagamento') THEN
   ALTER TABLE receitas ADD COLUMN forma_pagamento ENUM('pix','cartao','dinheiro','outros') NOT NULL DEFAULT 'outros' AFTER data_recebimento;
 END IF;
END $$
DELIMITER ;
CALL migrar_financehub_entrega3();
DROP PROCEDURE migrar_financehub_entrega3;
SHOW COLUMNS FROM receitas;
SHOW COLUMNS FROM despesas;
