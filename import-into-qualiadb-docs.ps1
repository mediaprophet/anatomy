# Copy distribution into the QualiaDB docs tree. The .hmc is the container.
# The member files are the assets the playground reads beside it.
param(
    [string]$Dest = "C:\github\qualiaDB\docs\playground\anatomy-studio"
)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$dist = Join-Path $root "distribution"
New-Item -ItemType Directory -Force -Path $Dest | Out-Null
Copy-Item (Join-Path $dist "containers\human-welfare.hmc") (Join-Path $Dest "human-welfare.hmc") -Force
Copy-Item (Join-Path $dist "manifest.json") (Join-Path $Dest "manifest.json") -Force
$exportDest = Join-Path $Dest "export"
if (Test-Path $exportDest) {
    Remove-Item $exportDest -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $exportDest | Out-Null
Copy-Item (Join-Path $dist "members\human") (Join-Path $exportDest "human") -Recurse
Write-Output "Imported distribution into $Dest"
