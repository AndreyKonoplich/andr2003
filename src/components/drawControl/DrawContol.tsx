import React, { useEffect, useRef, useState } from 'react';
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
  const modeRef = useRef<'none' | 'edit' | 'delete'>('none');

  useEffect(() => {
    if (!map || !featureGroupRef.current) return;

    if (drawOptions.edit) {
      drawOptions.edit.featureGroup = featureGroupRef.current;
    }

    const drawControl = new L.Control.Draw(drawOptions);

    const handleLayerClick = (layer: L.Layer) => {
      layer.on('click', () => {
        if (modeRef.current === 'none') {
          const coords = extractCoordinates(layer);
          setCoordinates(coords);
          setShowModal(true);
        }
      });
    };

    const handleDrawCreated = (e: L.DrawEvents.Created) => {
      if (!featureGroupRef.current) return;

      const layer = e.layer;
      featureGroupRef.current.addLayer(layer);
      handleLayerClick(layer);

      const coords = extractCoordinates(layer);
      setCoordinates(coords);
      setShowModal(true);
    };

    const refreshLayerClicks = () => {
      if (!featureGroupRef.current) return;

      featureGroupRef.current.eachLayer((layer) => {
        layer.off('click');
        handleLayerClick(layer);
      });
    };

    //подписки нужны для нормального удаления зон без лишнего показа модалки

    map.on(L.Draw.Event.CREATED, handleDrawCreated as L.LeafletEventHandlerFn);
    map.on(L.Draw.Event.EDITSTART, () => { modeRef.current = 'edit'; });
    map.on(L.Draw.Event.EDITSTOP, () => { modeRef.current = 'none'; refreshLayerClicks(); });
    map.on(L.Draw.Event.DELETESTART, () => { modeRef.current = 'delete'; });
    map.on(L.Draw.Event.DELETESTOP, () => { modeRef.current = 'none'; refreshLayerClicks(); });

    map.addLayer(featureGroupRef.current);
    map.addControl(drawControl);

    return () => {
      map.off(L.Draw.Event.CREATED, handleDrawCreated as L.LeafletEventHandlerFn);
      map.off(L.Draw.Event.EDITSTART);
      map.off(L.Draw.Event.EDITSTOP);
      map.off(L.Draw.Event.DELETESTART);
      map.off(L.Draw.Event.DELETESTOP);
      map.removeControl(drawControl);
    };
  }, [map, featureGroupRef]);

  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      coordinates={coordinates}
    />
  );
};

export default DrawControl;
