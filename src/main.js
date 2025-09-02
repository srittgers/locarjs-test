import "aframe";
import "locar-aframe";
import "troika-three-text";
import "aframe-look-at-component";

let firstLocation = true;
const locarCamera = document.querySelector("[locar-camera]");
const scene = document.querySelector("a-scene");

// Storage helpers
const STORAGE_KEY = "locar.savedPins.v1";
let currentCoords = null;

function loadSavedPins() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveSavedPins(pins) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pins));
}

function createPinEntity(lat, lon, label, options = {}) {
  const entityOuter = document.createElement("a-entity");
  entityOuter.setAttribute("position", "0 15 0");
  entityOuter.setAttribute("scale", "5 5 5");
  entityOuter.setAttribute("locar-entity-place", {
    latitude: lat,
    longitude: lon,
  });
  if (options.saved) entityOuter.classList.add("saved-pin");

  const model = document.createElement("a-gltf-model");
  model.setAttribute("src", "#locationPin");
  model.setAttribute("position", "0 0 0");
  model.setAttribute(
    "animation",
    "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear;"
  );

  const labelEl = document.createElement("a-entity");
  labelEl.setAttribute("text", {
    value: label,
    align: "center",
    color: options.color || "red",
  });
  labelEl.setAttribute("position", "0 12 0");
  labelEl.setAttribute("scale", "50 50 50");
  labelEl.setAttribute("look-at", "[locar-camera]");

  entityOuter.appendChild(model);
  entityOuter.appendChild(labelEl);
  scene.appendChild(entityOuter);
  return entityOuter;
}

function renderSavedPins() {
  const pins = loadSavedPins();
  pins.forEach((p) =>
    createPinEntity(p.lat, p.lon, p.label || "Saved Pin", {
      saved: true,
      color: "yellow",
    })
  );
}

locarCamera.addEventListener("gpsupdate", (e) => {
  const { latitude, longitude } = e.detail.position.coords;
  currentCoords = { lat: latitude, lon: longitude };
  // Default location is lat 0, lon 0 so ignore gpsupdate if for this location
  if (latitude != 0 && longitude != 0 && firstLocation) {
    alert(
      `Got the initial location: longitude ${longitude}, latitude ${latitude}`
    );

    const places = [
      [41.68821298667827, -93.64990084991088, "AMY HOUSE"],
      [41.69004155050095, -93.64760589282847, "BACK NEIGHBOR HOUSE"],
      [41.690089516871964, -93.64982951195867, "HORSE HOUSE"],
      [41.68837147930544, -93.65114765395116, "MEET HERE"],
    ];

    for (const place of places) {
      createPinEntity(place[0], place[1], place[2], { color: "red" });
    }

    // Render any previously saved pins
    renderSavedPins();

    firstLocation = false;
  }
});

// UI handlers
const btnSave = document.getElementById("btnSavePin");
const btnClear = document.getElementById("btnClearPins");

btnSave?.addEventListener("click", () => {
  if (!currentCoords) {
    alert("Waiting for GPS fix...");
    return;
  }
  const defaultLabel = `Pin ${new Date().toLocaleString()}`;
  const label = prompt("Name this pin:", defaultLabel) ?? defaultLabel;

  const pin = { lat: currentCoords.lat, lon: currentCoords.lon, label };
  const pins = loadSavedPins();
  pins.push(pin);
  saveSavedPins(pins);

  // Render immediately
  createPinEntity(pin.lat, pin.lon, pin.label, {
    saved: true,
    color: "yellow",
  });
});

btnClear?.addEventListener("click", () => {
  if (!confirm("Clear all saved pins?")) return;
  saveSavedPins([]);
  document.querySelectorAll(".saved-pin").forEach((el) => el.remove());
});
