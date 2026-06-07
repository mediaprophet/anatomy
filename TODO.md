# TODO / Roadmap — Qualia Anatomy

This document outlines remaining work for the Qualia Anatomy project (v0.0.2-dev and beyond).

## High Priority (Next Sprint)

### 1. Interactive BioStatus / Impact Explorer UI
- [ ] Build checklist interface (session-only data)
  - Categories: Conditions, Diet Factors, Medications, Other Modifiers
  - Multi-select support
- [ ] Connect checklist selections to 3D viewer
  - Highlight affected organs/systems
  - Show combined impact intensity (color + opacity)
  - Toggle individual factors on/off
- [ ] Add Impact Summary panel with explanations
- [ ] Support Generic (demo) mode using reference data + synthetic personas

### 2. QualiaDB Integration (Real WASM)
- [ ] Load actual QualiaDB WASM from v0.0.6 release
- [ ] Implement `Qualia.init()` properly in `qualia.js`
- [ ] Map `conditions.n3` data into Quin 5-tuples
- [ ] Execute N3Logic rules (or equivalent) via QualiaDB Prolog Sentinel
- [ ] Auto-insert spatial entities when organs load
- [ ] Support for multiple concurrent conditions on one "agent"

### 3. Multiple Conditions + Systemic View
- [ ] Allow selecting multiple conditions simultaneously
- [ ] Visual representation of combined / synergistic impacts
- [ ] Basic "systemic burden" scoring
- [ ] Support for diet modifiers affecting impact severity

## Medium Priority

### 4. Diet & Pharmacological Interaction Modeling
- [ ] Expand `rules.n3` with more diet interaction rules
- [ ] Add medication classes and basic drug-condition / drug-drug rules
- [ ] Create "What-if" scenario support (e.g. "Improve diet quality")
- [ ] Link diet patterns to specific organ system load

### 5. Local Installation & Private Mode
- [ ] Package as Tauri app (or simple downloadable bundle)
- [ ] Local QualiaDB persistence (user's personal vault)
- [ ] Clear separation between Public Demo mode and Private Evaluation mode
- [ ] Data import from Wellfair / Samsung Health / other sources

### 6. 3D Viewer Enhancements
- [ ] Load multiple organs simultaneously
- [ ] Layered impact overlays (color, annotations, pathways)
- [ ] "Systemic View" mode (highlight connected systems)
- [ ] Basic animation / progression views (e.g. disease progression over time)
- [ ] Better camera framing and organ labeling

## Lower Priority / Future

### 7. Knowledge Layer Improvements
- [ ] Expand `conditions.n3` with more conditions and richer metadata
- [ ] Add full diet interaction properties to conditions
- [ ] Create comprehensive pharmacological interaction rules
- [ ] Map to external ontologies (UBERON, SNOMED, etc.)
- [ ] Add provenance and confidence scores to impacts

### 8. Reasoning & Compute
- [ ] Full integration of N3Logic rules with QualiaDB
- [ ] SHACL validation during data import
- [ ] BioStatus scoring algorithm (combined systemic burden)
- [ ] "What-if" simulation engine

### 9. User Experience & Accessibility
- [ ] Onboarding / tutorial for the Impact Explorer
- [ ] Clear explanations of impacts (non-technical language)
- [ ] Mobile / touch-friendly 3D viewer improvements
- [ ] Export reports (PDF / JSON-LD)

### 10. Deployment & Distribution
- [ ] GitHub Pages demo (public mode)
- [ ] Documentation site (using the knowledge layer)
- [ ] Versioned releases of the knowledge files (`conditions.n3`, `rules.n3`)
- [ ] Integration examples for Wellfair and Episteme

## Technical Debt / Cleanup

- [ ] Remove old `conditions.ttl` (keep only N3 version)
- [ ] Standardize ontology namespaces and URIs
- [ ] Add proper licensing headers to all knowledge files
- [ ] Create test suite for rules and shapes
- [ ] Improve error handling in `qualia.js`

## Long-term Vision

- Full sovereign BioStatus evaluation engine
- Deep integration with Wellfair personal health vaults
- Support for complex polypharmacy + diet scenario modeling
- Contribution to human-centric health standards (W3C, etc.)
- Agentic use via Episteme (e.g. "Analyze my current regimen and suggest improvements")

---

**Last Updated:** 2026-06-07  
**Maintained by:** Timothy Holborn (@SailingDigital)