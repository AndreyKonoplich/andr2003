import L from 'leaflet';
import 'leaflet-draw'; 

export const customIcon = new L.Icon({
  iconUrl: 'icons/location.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const drawOptions: L.Control.DrawConstructorOptions = {
  position: 'topright',
  draw: {
    polygon: {
      allowIntersection: false,
      showArea: true,
      shapeOptions: { color: '#3388ff' },
    },
    rectangle: {
      shapeOptions: { color: '#ff5733' },
    },
    circle: {
      shapeOptions: { color: '#33cc33' },
    },
    marker: {
      icon: customIcon,
    },
    polyline: {
      shapeOptions: { color: '#ffcc00' },
    },
    circlemarker: {
      fillColor: '#ff66cc',
      color: '#ff66cc',
    },
  },
  edit: {
    featureGroup: new L.FeatureGroup(),
    remove: true,
  },
};
