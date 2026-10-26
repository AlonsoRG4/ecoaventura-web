@echo off
setlocal
cd /d "%~dp0"
echo ==============================================
echo   Publicando EcoAventura en GitHub Pages...
echo ==============================================
if not exist ".git" (
  git init -b main
  git remote add origin https://github.com/AlonsoRG4/ecoaventura-web.git
  git fetch origin main
  git reset origin/main
)
git add -A
git commit -m "Actualizar pagina de EcoAventura"
git push origin main
echo.
echo Listo. En 1-2 minutos los cambios estaran en:
echo https://alonsorg4.github.io/ecoaventura-web/
pause
