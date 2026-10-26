@echo off
setlocal
cd /d "%~dp0"

where py >nul 2>nul
if %errorlevel%==0 (
    start "EcoAventura - servidor local" /D "%~dp0" py -m http.server 8000
) else (
    start "EcoAventura - servidor local" /D "%~dp0" python -m http.server 8000
)

timeout /t 2 /nobreak >nul
start "" http://localhost:8000/index.html
endlocal
