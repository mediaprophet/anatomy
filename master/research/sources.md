# Sources for the body atlas

These are the corpora already wired in Qualia. A model is excellent when its geometry and traits come from these records, with the licence kept on the mesh.

## Reference organs, male and female

Human Reference Atlas / CCF reference-organ GLBs.

- SPARQL: `https://lod.humanatlas.io/sparql`
- Depictions are `foaf:depiction` URLs on `cdn.humanatlas.io` whose path contains `/ref-organ/` and ends in `.glb`
- Filenames encode the reference body and the organ, for example `3d-vh-m-liver.glb` and the female counterpart
- Licence recorded by the packer: CC-BY-4.0
- Producer already in Qualia: `qualia_client_core::wellfair::anatomy_pack::build_anatomy_pack`
- `curated: None` means every discovered reference organ for that model, not the short token list

## Muscles, bones, glands, nerves

BodyParts3D. The CCF reference organs are viscera. Muscles and many bones come from this set.

- Source: `https://lifesciencedb.jp/bp3d/`
- Licence: CC-BY-SA-2.1-JP
- Attribution, exact string: BodyParts3D, © The Database Center for Life Science licensed under CC Attribution-Share Alike 2.1 Japan
- Citation: Mitsuhashi N, Fujieda K, Tamura T, Kawamoto S, Takagi T, Okubo K. BodyParts3D: 3D structure database for anatomical concepts. Nucleic Acids Res. 2009 Jan;37(Database issue):D782-5. https://doi.org/10.1093/nar/gkn613
- Data DOI: `https://doi.org/10.18908/lsdba.nbdc00837-000`
- Part identity is FMA, with a part-of table
- Producer already in Qualia: `build_bodyparts3d_pack`

## Embryo stages

NIH 3D Carnegie series, stages 12–23, about days 26–56, CC-BY. The later fetal period is not covered by that series. Producer catalogue: `qualia_client_core::wellfair::fetal_stages`.

## Terms and systems

- Organ and part IRIs already used on the welfare meshes are UBERON (`http://purl.obolibrary.org/obo/UBERON_…`)
- The 17 body systems the welfare engine and this qapp share are `master/knowledge/system-map.json`
- Condition links are `master/knowledge/condition-map.json`

## What is not a source

Stature, mass, and obstetric figures baked into the current welfare compiler are profile constants for that schematic. They are not a substitute for the atlas records above.
