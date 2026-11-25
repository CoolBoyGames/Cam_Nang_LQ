@echo off
cd /d "%~dp0"

where pnpm >nul 2>nul
if errorlevel 1 (
  echo pnpm not found. Falling back to npm...
  if not exist "node_modules" call npm install
  call npm run dev -- --open
  pause
  exit /b
)

if not exist "node_modules" (
  echo Installing dependencies...
  call pnpm install
  if errorlevel 1 (
    echo Install failed.
    pause
    exit /b 1
  )
)

echo Starting Vite dev server...
call pnpm dev --open
pause
