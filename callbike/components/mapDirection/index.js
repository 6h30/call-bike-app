// MapDirection.js
import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { connect } from 'react-redux';
import { ThemedText } from '@/components/ThemedText';

import DirectionsMap from '../directionsMap'; 

import markerImage from '@/assets/marker.png';
import SearchBar from '../searchBar';
import { setRouteInfo } from '../redux/mapSlice';

class MapDirection extends Component {
  state = {
    userRegion: null,
    predefinedRegion: null,
    routeDuration: null,
    routeDistance: null,
    useDeviceLocation: true,
  };

  async componentDidMount() {
    this.requestLocationPermission();
  }

  requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Quyền truy cập vị trí bị từ chối!');
      return;
    }

    this.updateDeviceLocation();
  };

  updateDeviceLocation = async () => {
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
  };

  handleRouteReady = (result) => {
    this.setState({
      routeDuration: Math.floor(result.duration / 60),
      routeDistance: (result.distance / 1000).toFixed(2),
    });

    // Update Redux store with route info
    this.props.setRouteInfo({
      duration: Math.floor(result.duration / 60),
      distance: (result.distance / 1000).toFixed(2),
    });
  };

  handleSearch = (destination) => {
    this.setState({ predefinedRegion: destination });
  };

  toggleLocationMethod = () => {
    this.setState(prevState => ({
      useDeviceLocation: !prevState.useDeviceLocation,
    }), () => {
      if (this.state.useDeviceLocation) {
        this.updateDeviceLocation();
      }
    });
  };

  render() {
    const { userRegion, predefinedRegion, useDeviceLocation } = this.state;

    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <ThemedText>Nhập điểm đến:</ThemedText>
        <SearchBar onSearch={this.handleSearch} isPickupLocation={false} />

        <TouchableOpacity onPress={this.toggleLocationMethod} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>
            {useDeviceLocation ? 'Chọn điểm đón' : 'Dùng vị trí hiện tại'}
          </Text>
        </TouchableOpacity>

        {!useDeviceLocation && (
          <View>
            <ThemedText>Nhập điểm đón</ThemedText>
            <SearchBar onSearch={(region) => this.setState({ userRegion: region })} isPickupLocation={true} />
          </View>
        )}

        {userRegion && predefinedRegion ? (
          <Fragment>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: (userRegion.latitude + predefinedRegion.latitude) / 2,
                longitude: (userRegion.longitude + predefinedRegion.longitude) / 2,
                latitudeDelta: Math.abs(userRegion.latitude - predefinedRegion.latitude) + 0.1,
                longitudeDelta: Math.abs(userRegion.longitude - predefinedRegion.longitude) + 0.1,
              }}
              showsUserLocation={useDeviceLocation}
              loadingEnabled
            >
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
              <DirectionsMap
                origin={userRegion}
                destination={predefinedRegion}
                onReady={this.handleRouteReady}
              />
            </MapView>
          </Fragment>
        ) : (
          userRegion && (
            <MapView
              style={styles.map}
              region={userRegion}
              showsUserLocation
              loadingEnabled
            >
              <Marker
                coordinate={userRegion}
                anchor={{ x: 0.5, y: 0.5 }}
                image={markerImage}
              />
            </MapView>
          )
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
  toggleButton: {
    margin: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  toggleButtonText: {
    color: '#fff',
    textAlign: 'center',
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

const mapDispatchToProps = {
  setRouteInfo,
};

export default connect(null, mapDispatchToProps)(MapDirection);
