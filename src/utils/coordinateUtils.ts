import L from 'leaflet';

export const extractCoordinates = (layer: any): L.LatLng[] => {
  if (layer.getLatLng) {
    return [layer.getLatLng()];
  }
  if (layer.getLatLngs) {
    const latlngs = layer.getLatLngs();
    return flattenLatLngs(latlngs);
  }
  return [];
};

export const flattenLatLngs = (latlngs: any): L.LatLng[] => {
  if (!Array.isArray(latlngs)) return [];
  return latlngs.flat(Infinity).filter((point): point is L.LatLng => !!point?.lat && !!point?.lng);
};
