// osrm
import React, { useEffect, useState } from 'react';
import { Polyline } from 'react-native-maps';
import MapView from 'react-native-maps';

const Directions = ({ destination, origin }) => {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const getDirections = async () => {
      try {
        const response = await fetch(`http://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`);
        const json = await response.json();
        const points = json.routes[0].geometry.coordinates.map(point => ({
          latitude: point[1],
          longitude: point[0],
        }));
        setCoordinates(points);
      } catch (error) {
        console.error(error);
      }
    };

    getDirections();
  }, [destination, origin]);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: (origin.latitude + destination.latitude) / 2,
        longitude: (origin.longitude + destination.longitude) / 2,
        latitudeDelta: Math.abs(origin.latitude - destination.latitude) + 0.1,
        longitudeDelta: Math.abs(origin.longitude - destination.longitude) + 0.1,
      }}
    >
      <Polyline
        coordinates={coordinates}
        strokeWidth={3}
        strokeColor="#222"
      />
    </MapView>
  );
};

export default Directions;
