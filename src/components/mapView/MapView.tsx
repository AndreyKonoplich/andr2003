import React, { useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import DrawControl from 'components/drawControl/DrawContol';

const MapView: React.FC = () => {
  const featureGroupRef = useRef(new L.FeatureGroup());

  return (
    <MapContainer
      center={[53.9, 27.5667]}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        detectRetina={true}
      />
      <FeatureGroup ref={featureGroupRef} />
      <DrawControl featureGroupRef={featureGroupRef} />
    </MapContainer>
  );
};

export default MapView;
