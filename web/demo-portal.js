import { loadQualiaPortal, startPortalLoop } from "../../qualiaDB/docs/js/qualia-shell.js";

const shared = ["heart","lung_left","lung_right","eye_left","eye_right","brain","spinal_cord","liver","stomach","kidney_left","kidney_right","spleen","pancreas","trachea","thyroid","aorta","bladder","cranium","spine","pelvis","femur_left","femur_right","humerus_left","humerus_right","pectoralis","deltoid_left","deltoid_right","quadriceps_left","quadriceps_right"];
const bodies = {
  male: shared.concat(["prostate","testis_left","testis_right"]),
  female: shared.concat(["uterus","ovary_left","ovary_right"]),
  female_trimester_1: ["uterus","fetus","placenta"],
  female_trimester_2: ["uterus","fetus","placenta"],
  female_trimester_3: ["uterus","fetus","placenta"]
};
const ages = [
  { id: "reference", label: "Reference adult" },
  { id: "age8", label: "8 years", parts: ["heart"], body: "male" },
  { id: "age30_look60", label: "30 years, looks 60", parts: ["quadriceps_left"], body: "male" },
  { id: "age78_look55", label: "78 years, looks 55", parts: ["spine","aorta","quadriceps_left"], body: "male" },
  { id: "age78_look78", label: "78 years, looks 78", parts: ["quadriceps_left"], body: "male" }
];

const laneEl = document.getElementById("lane");
const bodyEl = document.getElementById("body");
const partEl = document.getElementById("part");
const ageEl = document.getElementById("age");
const statusEl = document.getElementById("status");
const canvas = document.getElementById("view");
const degradedEl = document.getElementById("degraded");
const degradedImg = document.getElementById("degraded-preview");

let portal = null;
let gpuReady = false;
let spinning = true;
let yaw = 0.6;
let pitch = 0.3;
let zoom = 3.5;
let drag = null;

function fillSelect(el, items) {
  el.replaceChildren();
  for (const item of items) {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    el.appendChild(option);
  }
}

function pathOf() {
  return location.pathname.replace(/\\/g, "/");
}

function inWorkingHeartPage() {
  const p = pathOf();
  return p.includes("/working/heart/view.html") || p.includes("/project/file/working/heart/");
}

function inProjectFile() {
  return pathOf().includes("/project/file/");
}

function assetRoot() {
  if (inWorkingHeartPage()) return "";
  return pathOf().includes("/web/") ? "../" : "";
}

function partsForSelection() {
  const age = ages.find(item => item.id === ageEl.value);
  if (age && age.parts) return age.parts;
  return bodies[bodyEl.value];
}

function refreshParts() {
  const current = partEl.value;
  const parts = partsForSelection();
  fillSelect(partEl, parts.map(part => ({ value: part, label: part.replaceAll("_", " ") })));
  if (parts.includes(current)) partEl.value = current;
  const heart = partEl.value === "heart" && ageEl.value === "reference";
  for (const option of laneEl.options) {
    option.disabled = !heart && option.value !== "published";
  }
  if (!heart) laneEl.value = "published";
}

function publishedPath() {
  const age = ages.find(item => item.id === ageEl.value);
  const part = partEl.value;
  return age && age.parts
    ? `members/authored/${age.body}/${age.id}/${part}.10d`
    : `members/authored/${bodyEl.value}/${part}.10d`;
}

function fileUrl() {
  const lane = laneEl.value;
  if (lane === "working-master" && partEl.value === "heart") {
    return inWorkingHeartPage()
      ? "master/heart-exterior.10d"
      : assetRoot() + "working/heart/master/heart-exterior.10d";
  }
  if (lane === "working-cad" && partEl.value === "heart") {
    return inWorkingHeartPage()
      ? "heart.10d"
      : assetRoot() + "working/heart/heart.10d";
  }
  const rel = publishedPath();
  if (inProjectFile()) return "/project/file/delivered/" + rel;
  if (inWorkingHeartPage()) return "../../distribution/" + rel;
  return assetRoot() + "distribution/" + rel;
}

/** Sibling of a `.10d` URL: replace only the trailing extension, keep the path. */
function siblingUrl(meshUrl, ext) {
  if (typeof meshUrl !== "string") return "";
  const lower = meshUrl.toLowerCase();
  if (!lower.endsWith(".10d")) return "";
  const suffix = ext.startsWith(".") ? ext : "." + ext;
  return meshUrl.slice(0, meshUrl.length - 4) + suffix;
}

function emfHint(receipt) {
  if (!receipt) return ".emf loaded";
  const nx = receipt.nx ?? "?";
  const ny = receipt.ny ?? "?";
  const nz = receipt.nz ?? "?";
  const cells = receipt.cell_count;
  const kind = receipt.kind
    || (typeof cells === "number" && cells > 1 ? "volume" : "cell");
  const grid = nx + "×" + ny + "×" + nz;
  const cellBit = typeof cells === "number" ? cells + " cells" : "cells";
  const sigma = receipt.mean_sigma;
  const sigmaBit = typeof sigma === "number" && Number.isFinite(sigma)
    ? " · σ=" + sigma.toFixed(3)
    : "";
  return ".emf " + kind + " " + grid + " (" + cellBit + ")" + sigmaBit;
}

function setDegradedMode(on) {
  gpuReady = !on;
  document.body.classList.toggle("degraded-2d", on);
  if (degradedEl) degradedEl.hidden = !on;
}

async function showDegradedPng(meshUrl) {
  setDegradedMode(true);
  const pngUrl = siblingUrl(meshUrl, ".png");
  if (!degradedImg) {
    statusEl.textContent = "Degraded 2D preview — QualiaPortal GPU unavailable";
    return;
  }
  degradedImg.removeAttribute("src");
  if (!pngUrl) {
    statusEl.textContent = "Degraded 2D preview — QualiaPortal GPU unavailable (no sibling PNG)";
    return;
  }
  try {
    const response = await fetch(pngUrl);
    if (!response.ok) {
      statusEl.textContent = "Degraded 2D preview — QualiaPortal GPU unavailable (no sibling PNG)";
      return;
    }
    const blob = await response.blob();
    degradedImg.src = URL.createObjectURL(blob);
    statusEl.textContent = "Degraded 2D preview — QualiaPortal GPU unavailable · " + pngUrl.split("/").pop();
  } catch (err) {
    statusEl.textContent = "Degraded 2D preview — QualiaPortal GPU unavailable (" + (err.message || err) + ")";
  }
}

async function loadSiblingEmf(meshUrl, meshStatus) {
  const emfUrl = siblingUrl(meshUrl, ".emf");
  if (!emfUrl) {
    statusEl.textContent = meshStatus + " · mesh-only (no field)";
    return;
  }
  statusEl.textContent = meshStatus + " · fetching " + emfUrl.split("/").pop();
  let response;
  try {
    response = await fetch(emfUrl);
  } catch (err) {
    statusEl.textContent = meshStatus + " · .emf fetch failed: " + (err.message || err) + " (mesh kept)";
    return;
  }
  if (response.status === 404) {
    statusEl.textContent = meshStatus + " · mesh-only (no field)";
    return;
  }
  if (!response.ok) {
    statusEl.textContent = meshStatus + " · .emf " + response.status + " (mesh kept)";
    return;
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  try {
    const receipt = portal.load_emf(bytes);
    statusEl.textContent = meshStatus + " · " + emfHint(receipt);
  } catch (err) {
    statusEl.textContent = meshStatus + " · .emf load failed: " + (err.message || String(err)) + " (mesh kept)";
  }
}

async function loadMesh() {
  if (!gpuReady || !portal) {
    await showDegradedPng(fileUrl());
    return;
  }
  const url = fileUrl();
  statusEl.textContent = "Fetching " + url.split("/").pop();
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.status + " " + url);
  const bytes = new Uint8Array(await response.arrayBuffer());
  statusEl.textContent = "QualiaPortal.load_10d " + bytes.length + " bytes";
  const receipt = portal.load_10d(bytes);
  const tris = receipt?.triangle_count ?? receipt?.total_triangles ?? "?";
  const verts = receipt?.vertex_count ?? "?";
  const renderer = window.__qualiaAnatomyInit?.renderer || "unknown";
  const meshStatus = tris + " triangles · " + verts + " verts · QualiaPortal/" + renderer;
  statusEl.textContent = meshStatus;
  portal.set_camera?.(yaw, pitch, zoom);
  await loadSiblingEmf(url, meshStatus);
}

function applyCamera() {
  portal?.set_camera?.(yaw, pitch, zoom);
}

function bindSelectors(liveCanvas) {
  const reload = () => loadMesh().catch(err => { statusEl.textContent = err.message; });
  laneEl.onchange = bodyEl.onchange = ageEl.onchange = () => {
    refreshParts();
    reload();
  };
  partEl.onchange = reload;
  document.getElementById("spin").onclick = () => { spinning = !spinning; };
  if (!liveCanvas) return;
  liveCanvas.onpointerdown = event => {
    drag = { x: event.clientX, y: event.clientY, yaw, pitch };
    spinning = false;
    liveCanvas.setPointerCapture(event.pointerId);
  };
  liveCanvas.onpointermove = event => {
    if (!drag) return;
    yaw = drag.yaw + (event.clientX - drag.x) * 0.01;
    pitch = drag.pitch + (event.clientY - drag.y) * 0.01;
    applyCamera();
  };
  liveCanvas.onpointerup = () => { drag = null; };
}

function gpuRendererName(loaded) {
  return loaded?.renderer || window.__qualiaAnatomyInit?.renderer || null;
}

async function boot() {
  fillSelect(bodyEl, Object.keys(bodies).map(id => ({ value: id, label: id.replaceAll("_", " ") })));
  fillSelect(ageEl, ages.map(age => ({ value: age.id, label: age.label })));
  const query = new URLSearchParams(location.search);
  if (query.get("lane") && [...laneEl.options].some(option => option.value === query.get("lane"))) {
    laneEl.value = query.get("lane");
  }
  if (query.get("body") && bodies[query.get("body")]) bodyEl.value = query.get("body");
  if (query.get("age") && ages.some(age => age.id === query.get("age"))) ageEl.value = query.get("age");
  refreshParts();
  if (query.get("part") && [...partEl.options].some(option => option.value === query.get("part"))) {
    partEl.value = query.get("part");
  }

  statusEl.textContent = "Opening QualiaPortal WASM";
  let loaded = null;
  try {
    loaded = await loadQualiaPortal(canvas, { allowWebGl2: true });
  } catch (err) {
    await showDegradedPng(fileUrl());
    bindSelectors(null);
    console.error(err);
    return;
  }
  portal = loaded.portal;
  if (loaded.canvas && loaded.canvas !== canvas) {
    loaded.canvas.id = "view";
  }
  const liveCanvas = loaded.canvas || canvas;
  const renderer = gpuRendererName(loaded);
  const gpuOk = !!portal && (renderer === "webgpu" || renderer === "webgl2");
  if (!gpuOk) {
    const detail = loaded.portalError?.message || loaded.portalError || window.__qualiaAnatomyInit?.error || "";
    console.warn("QualiaPortal GPU unavailable", detail);
    await showDegradedPng(fileUrl());
    bindSelectors(null);
    return;
  }
  gpuReady = true;
  startPortalLoop(liveCanvas, () => {
    if (spinning) {
      yaw += 0.008;
      applyCamera();
    }
  }, (next) => {
    next.id = "view";
  });
  bindSelectors(liveCanvas);
  await loadMesh();
}

boot().catch(err => {
  showDegradedPng(fileUrl()).finally(() => {
    statusEl.textContent = (statusEl.textContent || "Degraded 2D preview — QualiaPortal GPU unavailable")
      + (err?.message ? " · " + err.message : "");
  });
  console.error(err);
});
