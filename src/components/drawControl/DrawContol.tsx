import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { drawOptions } from 'utils/drawConfig';
import L from 'leaflet';
import 'leaflet-draw';

import 'leaflet-draw/dist/leaflet.draw.css';

interface DrawControlProps {
  featureGroupRef: React.RefObject<L.FeatureGroup>;
}

const DrawControl: React.FC<DrawControlProps> = ({ featureGroupRef }) => {
  const map = useMap();

  useEffect(() => {
    const initializeDrawControl = () => {
      if (!map || !featureGroupRef.current) {
        console.error('Map or FeatureGroup not initialized');
        return;
      }
  
      if (drawOptions.edit) {
        drawOptions.edit.featureGroup = featureGroupRef.current;
      } else {
        console.error('drawOptions.edit is undefined');
        return;
      }
  
      try {
        const drawControl = new L.Control.Draw(drawOptions);
  
        const handleDrawCreated = (e: L.DrawEvents.Created) => {
            const layer = e.layer as L.Layer;
          
            if (featureGroupRef.current) {
              featureGroupRef.current.addLayer(layer);
            }
          };
          
  
        map.addLayer(featureGroupRef.current);
        map.addControl(drawControl);
        map.on(L.Draw.Event.CREATED, handleDrawCreated as L.LeafletEventHandlerFn);
  
        return () => {
          map.off(L.Draw.Event.CREATED, handleDrawCreated as L.LeafletEventHandlerFn);
          map.removeControl(drawControl);
        };
      } catch (error) {
        console.error('Error initializing draw control:', error);
      }
    };
  
    initializeDrawControl();
  }, [map, featureGroupRef]);
  
  return null;
};

export default DrawControl;
