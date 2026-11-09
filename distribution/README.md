# Distribution

Shipped files. `containers/` is the bag. `members/` is what the bag holds.

| Path | Role |
|---|---|
| `containers/human-welfare.hmc` | Synth production package. SHA-256 `b26c952c13a0adb8937c5a8358baf6ab90aa3ddc53b24dbfb9ab0850d56fce47` |
| `members/human/` | The `.10d` bodies, measurements JSON, `.q42` rule files, turnarounds, and blueprints |
| `manifest.json` | Profile ids and the member paths |

Inside the container, each member is stored at `outputs/` plus the manifest path. Example: `outputs/human/male.10d`.

This drop is the welfare schematic (grouped parts, whole-body measurements). It is not the full organ atlas described in `master/research/`.
