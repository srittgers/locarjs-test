import "aframe";
import "locar-aframe";
import "troika-three-text";
import "aframe-look-at-component";

let firstLocation = true;
const locarCamera = document.querySelector("[locar-camera]");
const scene = document.querySelector("a-scene");

locarCamera.addEventListener("gpsupdate", (e) => {
  // Default location is lat 0, lon 0 so ignore gpsupdate if for this location
  if (
    e.detail.position.coords.latitude != 0 &&
    e.detail.position.coords.longitude != 0 &&
    firstLocation
  ) {
    alert(
      `Got the initial location: longitude ${e.detail.position.coords.longitude}, latitude ${e.detail.position.coords.latitude}`
    );

    const places = [
      [41.68821298667827, -93.64990084991088, "AMY HOUSE"],
      [41.69004155050095, -93.64760589282847, "BACK NEIGHBOR HOUSE"],
      [41.690089516871964, -93.64982951195867, "HORSE HOUSE"]
    ];

    for (const place of places) {
      const entityOuter = document.createElement("a-entity");
      entityOuter.setAttribute("position", "0 30 0");
      entityOuter.setAttribute("scale", "5 5 5");
      entityOuter.setAttribute("locar-entity-place", {
        latitude: place[0],
        longitude: place[1],
      });

      const model = document.createElement("a-gltf-model");
      model.setAttribute("src", "#locationPin");
      model.setAttribute("position", "0 0 0");
      model.setAttribute(
        "animation",
        "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear;"
      );

      const label = document.createElement("a-entity");
      label.setAttribute("text", {
        value: place[2],
        align: "center",
        color: "red",
      });
      label.setAttribute("position", "0 12 0");
      label.setAttribute("scale", "50 50 50");
      label.setAttribute("look-at", "[locar-camera]");

      entityOuter.appendChild(model);
      entityOuter.appendChild(label);
      scene.appendChild(entityOuter);
    }

    firstLocation = false;
  }
});

// document.querySelector('#setFakeLoc').addEventListener('click', e => {
//     const lat = document.getElementById('fakeLat').value;
//     const lon = document.getElementById('fakeLon').value;
//     locarCamera.setAttribute('locar-camera', {
//         simulateLatitude: parseFloat(lat),
//         simulateLongitude: parseFloat(lon)
//     });
// });
