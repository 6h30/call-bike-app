
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import DirectionsMap from '../directionsMap';

import { useRouter } from 'expo-router';

const FindDriver = () => {
  const pickupLocation = useSelector(state => state.map.pickupLocation);
  const [tripDetails, setTripDetails] = useState(null);
  const [driverArrived, setDriverArrived] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const driverData = {
      drivers: [
        {
          id: 1,
          name: "Trần Hạo Nam",
          carType: "Honda Civic",
          licensePlate: "51A-12345",
          phoneNumber: "0123456789",
          currentLocation: {
            latitude: 10.760601088966975,
            longitude: 106.7426753037618
          }
        }
      ]
    };

    if (pickupLocation) {
      const assignedDriver = driverData.drivers[0];
      setTripDetails({
        driver: assignedDriver,
        startLocation: assignedDriver.currentLocation,
        endLocation: {
          latitude: pickupLocation.latitude,
          longitude: pickupLocation.longitude
        },
      });
    }
  }, [pickupLocation]);

  const handleDriverArrivalConfirmation = () => {
    router.push({
      pathname: '/tripProgress',
    });
    setDriverArrived(true);
  };

  if (!tripDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Đang tìm tài xế...</Text>
      </View>
    );
  }

  const { driver, startLocation, endLocation } = tripDetails;

  const customMarkerUrl = 'https://api.geoapify.com/v1/icon/?type=awesome&color=green&size=large&icon=user&scaleFactor=2&apiKey=73b004e1726b4e76bb8dbad223aff721';

  const driverMarkerUrl = 'https://api.geoapify.com/v1/icon/?type=awesome&color=red&size=large&icon=car&scaleFactor=2&apiKey=73b004e1726b4e76bb8dbad223aff721';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin tài xế của bạn</Text>
      <View style={styles.driverCard}>
        <Text style={styles.driverText}>ID: {driver.id}</Text>
        <Text style={styles.driverText}>Tên: {driver.name}</Text>
        <Text style={styles.driverText}>Loại xe: {driver.carType}</Text>
        <Text style={styles.driverText}>Biển số: {driver.licensePlate}</Text>
        <Text style={styles.driverText}>SĐT: {driver.phoneNumber}</Text>
        <Text style={styles.driverText}>Vị trí tài xế: {driver.currentLocation.latitude}, {driver.currentLocation.longitude}</Text>
      </View>
      <View style={styles.tripDetails}>
        <Text style={styles.subTitle}>Chi tiết chuyến đi</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: (startLocation.latitude + endLocation.latitude) / 2,
            longitude: (startLocation.longitude + endLocation.longitude) / 2,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker coordinate={startLocation} title="Tài xế" image={{ uri: driverMarkerUrl }} />
          <Marker coordinate={endLocation} title="Khách hàng" image={{ uri: customMarkerUrl }} />
          <DirectionsMap
            origin={startLocation}
            destination={endLocation}
            onReady={(result) => {
              console.log('Route is ready', result);
            }}
          />
        </MapView>
        <Button title="Xác nhận tài xế đã đến" onPress={handleDriverArrivalConfirmation} />
        {/* {driverArrived && <Text style={styles.confirmationText}>Tài xế đã đến nơi</Text>} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  driverCard: {
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  driverText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tripDetails: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  confirmationText: {
    marginTop: 10,
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default FindDriver;
