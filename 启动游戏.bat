@echo off
rem ============================================================
rem  GOLDEN HOUR - Solstice Hotel  (local launcher)
rem  Opens index.html in Chrome / Edge / default browser.
rem ============================================================
setlocal
cd /d "%~dp0"

if not exist "index.html" (
  echo [ERROR] index.html not found next to this script.
  pause
  exit /b 1
)
if not exist "dist\game.js" (
  echo [ERROR] dist\game.js not found - the game bundle is missing.
  pause
  exit /b 1
)

set "BROWSER="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "BROWSER=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not defined BROWSER if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "BROWSER=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not defined BROWSER if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" set "BROWSER=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
if not defined BROWSER if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" set "BROWSER=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not defined BROWSER if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" set "BROWSER=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"

if defined BROWSER (
  start "" "%BROWSER%" "%~dp0index.html"
) else (
  start "" "%~dp0index.html"
)
exit /b 0
