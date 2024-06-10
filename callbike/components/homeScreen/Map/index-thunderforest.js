import React, { Component, Fragment } from 'react';
import { View, Image } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
// import Geocoder from 'react-native-geocoding'; // Bỏ phần này nếu không cần dùng Google Geocoding

import { getPixelSize } from '../untils';
import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';

import markerImage from '@/assets/marker.png';
import backImage from '@/assets/history.png';

import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
} from './styles';

// Nếu vẫn cần dùng Geocoder, giữ lại và thay API key của Thunderforest
// Geocoder.init('YOUR_THUNDERFOREST_API_KEY');

export default class Map extends Component {
  state = {
    region: null,
    destination: null,
    duration: null,
    location: null,
  };

  async componentDidMount() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Quyền truy cập vị trí đã bị từ chối');
      return;
    }

    let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    // Nếu vẫn cần dùng Geocoder, giữ lại phần này
    // const response = await Geocoder.from({ latitude, longitude });
    // const address = response.results[0].formatted_address;
    // const location = address.substring(0, address.indexOf(','));

    this.setState({
      location: 'Your Location', // Bạn có thể thay đổi cách hiển thị địa chỉ
      region: {
        latitude,
        longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      },
    });
  }

  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude },
    } = geometry;

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text,
      },
    });
  };

  handleBack = () => {
    this.setState({ destination: null });
  };

  render() {
    const { region, destination, duration, location } = this.state;
    const thunderforestApiKey = 'c82c81c3ae1f42b48cf72ff4655754c1'; // Thay bằng API key của bạn

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={region}
          showsUserLocation
          loadingEnabled
          ref={el => (this.mapView = el)}>
          <UrlTile
            urlTemplate={`https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${thunderforestApiKey}`}
            maximumZ={19}
          />
          {destination && (
            <Fragment>
              <Directions
                origin={region}
                destination={destination}
                onReady={result => {
                  this.setState({ duration: Math.floor(result.duration) });

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(350),
                    },
                  });
                }}
              />
              <Marker
                coordinate={destination}
                anchor={{ x: 0, y: 0 }}
                image={markerImage}>
                <LocationBox>
                  <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>

              <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>{location}</LocationText>
                </LocationBox>
              </Marker>
            </Fragment>
          )}
        </MapView>

        {destination ? (
          <Fragment>
            <Back onPress={this.handleBack}>
              <Image source={backImage} />
            </Back>
            <Details />
          </Fragment>
        ) : (
          <Search onLocationSelected={this.handleLocationSelected} />
        )}
      </View>
    );
  }
}
