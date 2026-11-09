# Distribution

Shipped files. `containers/` is the bag. `members/` is what the bag holds.

| Path | Role |
|---|---|
| `containers/human-welfare.hmc` | Synth production package. SHA-256 `b26c952c13a0adb8937c5a8358baf6ab90aa3ddc53b24dbfb9ab0850d56fce47` |
| `members/human/` | The `.10d` bodies, measurements JSON, `.q42` rule files, turnarounds, and blueprints |
| `containers/anatomy-atlas.hmc` | Synth production package for the master reference atlas. SHA-256 `cafb5c0314b9d62eb0a3e27b5ba4942024fb3baf60769f81d89135d2fe8c770b` |
| `members/atlas-master/` | Male and female anatomy-pack containers, fit files, constitutions, and pack reports |
| `manifest.json` | Profile ids, member paths, and the master atlas record |

Inside the container, each member is stored at `outputs/` plus the manifest path. Example: `outputs/human/male.10d`.

`human-welfare.hmc` is the welfare schematic (grouped parts, whole-body measurements).

`anatomy-authored.hmc` is the Synth-generated part set. Each named part is made by the compiler. `chronological_age_years` and `appearance_age_years` are separate: bone, vessels, and organs follow years lived; superficial muscle also follows how old the person looks. A fetus follows gestational week. This is not an encyclopedic atlas.
