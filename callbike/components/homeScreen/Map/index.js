import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';

import markerImage from '@/assets/marker.png';

const Directions = ({ destination, origin, onReady }) => {
  const [coordinates, setCoordinates] = React.useState([]);

  React.useEffect(() => {
    const getDirections = async () => {
      try {
        const response = await fetch(`http://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`);
        const json = await response.json();
        const points = json.routes[0].geometry.coordinates.map(point => ({
          latitude: point[1],
          longitude: point[0],
        }));
        setCoordinates(points);
        if (onReady) {
          onReady(json.routes[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getDirections();
  }, [destination, origin, onReady]);

  return (
    <Polyline
      coordinates={coordinates}
      strokeWidth={3}
      strokeColor="#222"
    />
  );
};

export default class Map extends Component {
  state = {
    userRegion: null,
    predefinedRegion: {
      latitude: 10.7628356, 
      longitude: 106.6799021, 
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    },
    routeDuration: null,
  };

  async componentDidMount() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Location permission denied');
      return;
    }

    let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    this.setState({
      userRegion: {
        latitude,
        longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      },
    });
  }

  handleRouteReady = (result) => {
    this.setState({ routeDuration: Math.floor(result.duration / 60) });
  };

  render() {
    const { userRegion, predefinedRegion, routeDuration } = this.state;
    const thunderforestApiKey = 'c82c81c3ae1f42b48cf72ff4655754c1'; // Replace with your Thunderforest API key

    return (
      <View style={{ flex: 1 }}>
        {userRegion && (
          <Fragment>
            <MapView
              style={styles.map}
              region={userRegion}
              showsUserLocation
              loadingEnabled
            >
              {/* <UrlTile
                urlTemplate={`https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${thunderforestApiKey}`}
                maximumZ={19}
              /> */}
              <Marker
                coordinate={userRegion}
                anchor={{ x: 0.5, y: 0.5 }}
                image={markerImage}
              />
            </MapView>

            <MapView
              style={styles.map}
              region={predefinedRegion}
              loadingEnabled
            >
              {/* <UrlTile
                urlTemplate={`https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${thunderforestApiKey}`}
                maximumZ={19}
              /> */}
              <Marker
                coordinate={predefinedRegion}
                anchor={{ x: 0.5, y: 0.5 }}
                image={markerImage}
              />
            </MapView>

            <MapView
              style={styles.map}
              initialRegion={{
                latitude: (userRegion.latitude + predefinedRegion.latitude) / 2,
                longitude: (userRegion.longitude + predefinedRegion.longitude) / 2,
                latitudeDelta: Math.abs(userRegion.latitude - predefinedRegion.latitude) + 0.1,
                longitudeDelta: Math.abs(userRegion.longitude - predefinedRegion.longitude) + 0.1,
              }}
              ref={el => (this.mapView = el)}
              showsUserLocation
              loadingEnabled
            >
              {/* <UrlTile
                urlTemplate={`https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${thunderforestApiKey}`}
                maximumZ={19}
              /> */}
              <Marker
                coordinate={userRegion}
                anchor={{ x: 0.5, y: 0.5 }}
                image={markerImage}
              />
              <Marker
                coordinate={predefinedRegion}
                anchor={{ x: 0.5, y: 0.5 }}
                image={markerImage}
              />
              <Directions
                origin={userRegion}
                destination={predefinedRegion}
                onReady={this.handleRouteReady}
              />
            </MapView>

            {routeDuration && (
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>Duration: {routeDuration} min</Text>
              </View>
            )}
          </Fragment>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    marginBottom: 10,
  },
  infoBox: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  infoText: {
    fontSize: 16,
  },
});

function getPixelSize(pixels) {
  return pixels;
}
