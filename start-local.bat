@echo off
title Sales Tracker - Local Server
cd /d "%~dp0"

where python >nul 2>nul
if errorlevel 1 (
  echo.
  echo  [ERROR] Python nahi mila!
  echo.
  echo  Pehle https://www.python.org/downloads/ se Python install karein.
  echo  Install ke waqt "Add python.exe to PATH" wala tick zaroor lagayein,
  echo  phir ye file dobara double-click karke chalayein.
  echo.
  pause
  exit /b 1
)

echo.
echo  =================================================
echo    Sales Tracker chal raha hai!
echo  =================================================
echo.
echo  Apne MOBILE par (isi WiFi se connected) ye kholein:
echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
  for /f "tokens=* delims= " %%b in ("%%a") do echo    http://%%b:8000
)
echo.
echo  Pehli dafa Windows Firewall puche to "Allow access" dabayein.
echo  Band karne ke liye ye window close kar dein.
echo.
python -m http.server 8000
pause
