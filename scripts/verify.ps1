# Runs the full modernization verification suite:
#   1. Backend pytest smoke tests (module imports)
#   2. Frontend TypeScript check + Vite production build
#
# Exits non-zero on any failure so CI / azd hooks can gate on it.

$ErrorActionPreference = "Stop"
$repo = Split-Path -Parent $PSScriptRoot
$python = "C:\Users\CGSIAHA\AppData\Local\miniforge3\envs\cs-rag\python.exe"

Write-Host "== Backend pytest ==" -ForegroundColor Cyan
& $python -m pytest "$repo\tests" -q
if ($LASTEXITCODE -ne 0) { Write-Host "Backend tests failed"; exit 1 }

Write-Host "== Frontend build ==" -ForegroundColor Cyan
Push-Location "$repo\app\frontend"
try {
	npm run build
	if ($LASTEXITCODE -ne 0) { Write-Host "Frontend build failed"; exit 1 }
}
finally {
	Pop-Location
}

Write-Host "All checks passed." -ForegroundColor Green
