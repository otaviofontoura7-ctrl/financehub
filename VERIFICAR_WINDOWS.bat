@echo off
chcp 65001 >nul
cd /d "%~dp0backend"
where node >nul 2>nul
if errorlevel 1 (
 echo ERRO: Node.js ausente. Instale a versao LTS pelo site oficial nodejs.org
 pause
 exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
 echo ERRO: npm nao encontrado. Reinstale Node.js LTS e reinicie o terminal.
 pause
 exit /b 1
)
echo [1/3] Versoes
call node -v
call npm -v
echo [2/3] Dependencias
call npm install
if errorlevel 1 (pause & exit /b 1)
echo [3/3] Testes automatizados
call npm test
if errorlevel 1 (pause & exit /b 1)
echo Testes de codigo concluidos. Ainda e necessario MySQL Server, banco e .env para testar a integracao.
pause
