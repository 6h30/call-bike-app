// google map
import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyC4d9HJz5nBz1ZXochyb-J3vwLopdw_9H8"
    strokeWidth={3}
    strokeColor="#222"
  />
);

export default Directions;

