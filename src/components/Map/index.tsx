



import { useEffect, useState } from 'react';
import { useLoadScript } from "@react-google-maps/api";
import { Box } from '@mui/material';

const Map = ({ position }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDeWPGceHoDq87CB8b7Tdh73T2cc8ezB9U',
  });

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const initMap = async () => {

    const { Map } = await window.google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const mapInstance = new Map(
      document.getElementById('map'),
      {
        zoom: 17,
        center: position,
        mapId: 'AIzaSyDeWPGceHoDq87CB8b7Tdh73T2cc8ezB9U',
      }
    );

    setMap(mapInstance);

    const markerInstance = new AdvancedMarkerElement({
      map: mapInstance,
      position: position,
      title: 'Uluru'
    });

    setMarker(markerInstance);
  };

  useEffect(() => {
    if (isLoaded && !loadError) {
      initMap();
    }
  }, [isLoaded, loadError, position]);

  if (loadError) return "Erro ao carregar o mapa";
  if (!isLoaded) return "Carregando o mapa...";

  return (
    <Box
      className="container-map">
      <Box id="map" style={{ height: "400px", width: "100%" }} />
    </Box>
  );
};

export default Map;
