import mapboxgl from "mapbox-gl";

const mapElement = () =>  { return document.getElementById("map") };

const buildMap = () => {
  mapboxgl.accessToken = mapElement().dataset.mapboxApiKey;
  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v9"
    // style: "mapbox://styles/mapbox/dark-v10"
  });
};

const addMarkersAndInfoWindowsToMap = (map, markers) => {
  const mapOnSpotShowPage = document.querySelector(".js-spot-map");
  markers.forEach((marker) => {
    const element = document.createElement("div");
    element.className = "marker";
    element.style.backgroundImage = `url('${marker.image_url}')`;
    element.style.backgroundSize = "contain";
    element.style.backgroundRepeat = "no-repeat";
    element.style.width = "32px";
    element.style.height = "32px";

    // Don't add info windows on the spot show page
    if (mapOnSpotShowPage) {
      new mapboxgl.Marker(element)
      .setLngLat([marker.lng, marker.lat])
      .addTo(map);
    } else {
      const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
      new mapboxgl.Marker(element)
      .setLngLat([marker.lng, marker.lat])
      .setPopup(popup)
      .addTo(map);
    }
  });
};

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([marker.lng, marker.lat]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
};

const initMapbox = () => {
  if (mapElement()) {
    const map = buildMap();
    const markers = JSON.parse(mapElement().dataset.markers);
    addMarkersAndInfoWindowsToMap(map, markers);
    fitMapToMarkers(map, markers);
  }
};

export { initMapbox };
