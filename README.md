# Anatomy

Release package for the Qualia human-welfare body. Synth produces the HMC.
QualiaDB docs, and a Webizen site that serves those docs, import this package
and present it with QualiaPortal.

`main` still has the previous viewer. This branch, `release/human-welfare-hmc`,
is the replacement. The previous files are on `archive/viewer-0.0.8` and also
under `archive/viewer-0.0.8/` in this tree.

## Release

| Path | Role |
|---|---|
| `source/human_anatomy.vibe` | VibeScript that calls the human welfare compiler |
| `release/human-welfare.hmc` | Synth `files/1` package, SHA-256 `b26c952c13a0adb8937c5a8358baf6ab90aa3ddc53b24dbfb9ab0850d56fce47` |
| `release/export/human/` | The 39 member files (`.10d`, measurements JSON, `.q42`, turnaround, blueprint) |
| `release/manifest.json` | Profile ids and the keys inside the HMC |
| `knowledge/` | System map, condition map, and shapes the welfare engine already reads |

Mesh members live in the bundle under `outputs/` plus the manifest path. Example: `outputs/human/male.10d`.

## Import into QualiaDB docs

From this directory:

```powershell
.\import-into-qualiadb-docs.ps1
```

That copies `release/` into `qualiaDB/docs/playground/anatomy-studio/`. The playground host fetches `anatomy-studio/human-welfare.hmc` and passes each `.10d` to QualiaPortal `load_hmc_mesh`. A Webizen host that serves `qualiaDB/docs/` picks up the same files.

## What this package contains

Adult male, adult female, trimester weeks 10, 22 and 38, and a week-34 body. Male, female, and the three trimester profiles also have skeleton and écorché peels. Measurements and rule containers are the compiler output stored beside each composite body.
