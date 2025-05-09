import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { drawOptions } from 'utils/drawConfig';
import L from 'leaflet';
import Modal from 'components/modal/Modal';
import { DrawControlProps } from 'types/interfaces';
import { extractCoordinates } from 'utils/coordinateUtils';
import 'leaflet-draw';

import 'leaflet-draw/dist/leaflet.draw.css';

const DrawControl: React.FC<DrawControlProps> = ({ featureGroupRef }) => {
  const map = useMap();
  const [showModal, setShowModal] = useState(false);
  const [coordinates, setCoordinates] = useState<L.LatLng[]>([]);

  useEffect(() => {
    if (!map || !featureGroupRef.current) return;

    if (drawOptions.edit) {
      drawOptions.edit.featureGroup = featureGroupRef.current;
    }

    const drawControl = new L.Control.Draw(drawOptions);

    const handleDrawCreated = (e: L.DrawEvents.Created) => {
      if (!featureGroupRef.current) return;
      
      const layer = e.layer;
      featureGroupRef.current.addLayer(layer);

      layer.on('click', () => {
        const coords = extractCoordinates(layer);
        setCoordinates(coords);
        setShowModal(true);
      });

      const coords = extractCoordinates(layer);
      setCoordinates(coords);

      setShowModal(true);      
    };

    map.addLayer(featureGroupRef.current);
    map.addControl(drawControl);
    map.on(L.Draw.Event.CREATED, handleDrawCreated as L.LeafletEventHandlerFn);

    return () => {
      map.off(L.Draw.Event.CREATED, handleDrawCreated as L.LeafletEventHandlerFn);
      map.removeControl(drawControl);
    };
  }, [map, featureGroupRef]);

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        coordinates={coordinates}
      />
    </>
  );
};

export default DrawControl;
