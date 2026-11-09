# Copy this release into the QualiaDB docs tree so the playground and any
# Webizen site that serves those docs pick up the same HMC.
param(
    [string]$Dest = "C:\github\qualiaDB\docs\playground\anatomy-studio"
)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$release = Join-Path $root "release"
New-Item -ItemType Directory -Force -Path $Dest | Out-Null
Copy-Item (Join-Path $release "human-welfare.hmc") (Join-Path $Dest "human-welfare.hmc") -Force
Copy-Item (Join-Path $release "manifest.json") (Join-Path $Dest "manifest.json") -Force
$exportDest = Join-Path $Dest "export"
if (Test-Path $exportDest) {
    Remove-Item $exportDest -Recurse -Force
}
Copy-Item (Join-Path $release "export") $exportDest -Recurse
Write-Output "Imported human-welfare release into $Dest"
