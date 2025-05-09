export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    coordinates: L.LatLng[];
}

export interface DrawControlProps {
    featureGroupRef: React.RefObject<L.FeatureGroup>;
}
  