# Anatomy

Three trees. `main` is still the previous viewer. This branch, `release/human-welfare-hmc`, is the replacement. The old viewer is also under `archive/viewer-0.0.8/`.

| Tree | Role |
|---|---|
| `master/` | Research and the VibeScript. This is what production has to satisfy |
| `distribution/` | Shipped member files, plus the `.hmc` that only bags them |
| `web/` | The page for GitHub Pages |

Synth produces the members. `distribution/containers/human-welfare.hmc` is the current container, SHA-256 `b26c952c13a0adb8937c5a8358baf6ab90aa3ddc53b24dbfb9ab0850d56fce47`.

## Pages

`.github/workflows/pages.yml` publishes `web/index.html` together with `distribution/` and `master/` when this branch is pushed, after GitHub Pages is enabled for the repository. Until then, with Pages set to this branch and the repository root, the page is `/web/` and its links use `../distribution` and `../master`.

## Import into QualiaDB docs

```powershell
.\import-into-qualiadb-docs.ps1
```

That copies the container and the members into `qualiaDB/docs/playground/anatomy-studio/`. A Webizen host that serves those docs uses the same files. QualiaPortal loads each `.10d` from the container.

## Current drop

Adult male, adult female, and pregnancy weeks 10, 22, 34, and 38. These are welfare schematics. The atlas those files still have to become is described in `master/research/modelling-requirements.md`.
