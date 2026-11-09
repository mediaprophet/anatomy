# Modelling requirements

A body that is ready to distribute has these properties. The current `distribution/members/human/` files are a welfare schematic. They do not yet meet this list.

1. Male and female reference bodies, each organ its own mesh, from the HRA reference-organ set.
2. Muscles, bones, glands, and nerves from BodyParts3D where the reference-organ set does not carry them, with the CC-BY-SA-2.1-JP attribution stored on the part.
3. Named parts a person can open one at a time: heart, each lung, eyes, and the rest of the discovered organs. Traits sit on that part (identity, system memberships, source URL, licence), not only on the whole body.
4. Pregnancy as a series of female bodies, not one blended mesh. The welfare profiles use weeks 10, 22, 34, and 38. Embryo geometry, when added, uses the Carnegie stages in the sources note.
5. The 17 systems in `master/knowledge/system-map.json` are the system ids. A system with no mesh is unfinished, not a painted label.
6. Synth produces the package. The VibeScript lists the compiles and the member files. The `.hmc` only bags those files.
