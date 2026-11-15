# Modelling requirements

A body that is ready to distribute has these properties. The current `distribution/members/human/` files are a welfare schematic. They do not yet meet this list.

Synth authors every named organ. External corpora (HRA, BodyParts3D, plates) are evidence, not the authored mesh.

## Masters and derived copies

1. The **master** of each organ is an extremely high-resolution, high-quality Synth asset. It holds recognisable exterior form **and** inspectable interior structure: myocardium, epicardial fat, chamber walls, and vascular trees down to the calibre the organ needs for inspection. A heart master is not an ellipsoid or a revolved teardrop.
2. **Lossy / atlas copies** are produced from that master (simplify, decimate, bake). They are never the source of truth. Overview bodies, system maps, and lightweight previews are derived.
3. Production gathers an **evidence array** first: licensed plates plus generated multi-view stills of the same subject (anterior, posterior, laterals, superior/base, turnaround, tissue/fat/vascular close-ups). The master is compared against that array before it leaves `working/`.
4. Generated stills of the subject, in the perspectives the organ needs, are valid reference. They are stored under `working/<organ>/refs/` and used to drive CAD, image-to-mesh, and review.

## What a finished body contains

5. Male and female reference bodies, each organ its own mesh, Synth-authored.
6. Named parts a person can open one at a time: heart, each lung, eyes, and the rest of the discovered organs. Traits sit on that part (identity, system memberships, source URL, licence), not only on the whole body.
7. Pregnancy as a series of female bodies, not one blended mesh. The welfare profiles use weeks 10, 22, 34, and 38. Embryo geometry, when added, uses the Carnegie stages in the sources note.
8. The 17 systems in `master/knowledge/system-map.json` are the system ids. A system with no mesh is unfinished, not a painted label.
9. Synth produces the package. The VibeScript lists the compiles and the member files. The `.hmc` only bags those files.
