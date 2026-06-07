# anatomy

**Qualia Anatomy** — Sovereign 3D holographic anatomy interface powered by QualiaDB.

Uses the official HuBMAP / Human Reference Atlas `.glb` reference organs as the canonical spatial models, with QualiaDB providing the semantic graph, consent modeling, provenance, and Principal-Agent layer.

## Vision

A first-class, edge-native component for **Wellfair** (personal health sovereignty) and Webizen-style decentralized applications.

Enables:
- 3D biometric holographs
- Spatial registration of personal health data onto reference anatomy
- Consent-aware and guardianship-aware interaction with anatomical structures
- Local-first operation with strong privacy and sovereignty guarantees
- BioStatus evaluation with support for multiple conditions, diet, and pharmacological interactions

## Current Status (v0.0.2-dev)

### Working
- Real HuBMAP CCF / Human Reference Atlas `.glb` models (male + female)
- Babylon.js powered 3D viewer with orbit controls, wireframe, auto-rotate
- Basic organ selection and sex switching
- `qualia.js` helper module for WASM integration
- Knowledge layer:
  - `knowledge/conditions.n3` — ~42 common conditions with organ/system impact mappings (N3 format)
  - `knowledge/rules.n3` — N3Logic rules for combined systemic impacts and diet interactions
  - `knowledge/shapes.shacl` — SHACL validation shapes

### Next Priorities (see TODO.md)
- Deeper QualiaDB integration (Quin 5-tuple mapping + Prolog rules)
- Interactive checklist → BioStatus evaluation UI
- Support for multiple conditions + diet + pharmacology in the 3D viewer
- Generic (demo) mode vs Personal (local QualiaDB) mode
- Local installation support (Tauri / downloadable bundle)

## Repository Structure

```
anatomy/
├── README.md
├── TODO.md
├── index.html                 # Main 3D viewer
├── qualia.js                  # QualiaDB WASM helper
└── knowledge/
    ├── conditions.n3          # Condition definitions + organ impacts (N3)
    ├── rules.n3               # N3Logic rules for combined impacts
    └── shapes.shacl           # SHACL validation shapes
```

## Related Projects

- [qualiaDB](https://github.com/mediaprophet/qualiaDB) — Core zero-allocation graph engine
- Wellfair — Health-to-Solid personal data vault (in development)
- Episteme — Human-centric prompt engineering & agent framework

## Principles

- Sovereign by default (local-first, offline-capable)
- Human dignity and agency as first-class architectural concerns
- Uses canonical open reference data (HRA) rather than proprietary models
- Designed for consent, provenance, and guardianship modeling via QualiaDB
- Supports both public demo mode and private local evaluation

## License

CC-BY-NC-ND 4.0 (matching qualiaDB).  
Commercial licensing and dual-licensing options available via Timothy Charles Holborn.

---

**Contact**  
Timothy Holborn  
X: [@SailingDigital](https://x.com/SailingDigital)  
GitHub: [mediaprophet](https://github.com/mediaprophet)