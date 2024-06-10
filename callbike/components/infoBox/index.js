
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';

const InfoBox = () => {
  const { routeDuration, routeDistance, destination, pickupLocation } = useSelector(state => state.map);
  const { selectedCarType } = useSelector(state => state.car);
  const { customerData } = useSelector(state => state.auth);
  const router = useRouter();

  const calculatePrice = (distance) => {
    const baseFee = 10000;
    const additionalFee = 4000;
    const totalDistance = parseFloat(distance);
    const totalPrice = totalDistance <= 1 ? baseFee : baseFee + (totalDistance - 1) * additionalFee;
    return totalPrice.toFixed(0);
  };

  const totalPrice = routeDistance ? calculatePrice(routeDistance) : null;

  if (routeDuration === null || routeDistance === null || !destination.formattedAddress) {
    return null; // Không hiển thị nếu không có thông tin
  }

  const handleFindDriver = async () => {
        // Điều hướng đến trang /findDriver
        router.push({
          pathname: '/findDriver',
          params: {
            pickupLocation: JSON.stringify(pickupLocation),
            destination: JSON.stringify(destination)
          }
        });
  };

  // Bổ sung cho RabbitMQ
  // const handleFindDriver = async () => {
  //   const requestData = {
  //     // customerId: 1,
  //     // pickupLocation: pickupLocation,
  //     // destination: destination,
  //     // carType: 'SUV'

  //     customerId: 1,
  //     requestTime: new Date(),
  //     pickupLocation: { latitude: 10.7525361, longitude: 106.7402727 },
  //     dropoffLocation: { latitude: 10.7641366, longitude: 106.6799635 },
  //     status: 'pending',
  //   };

  //   try {
  //     const response = await fetch('http://localhost:4000/api/trip-request/create', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(requestData),
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log('Trip request created successfully:', responseData);
        
  //       // Điều hướng đến trang /findDriver
  //       router.push({
  //         pathname: '/findDriver',
  //         params: {
  //           pickupLocation: JSON.stringify(pickupLocation),
  //           destination: JSON.stringify(destination)
  //         }
  //       });
  //     } else {
  //       console.error('Failed to create ride request:', response.statusText);
        
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
      
  //   }
  // };

  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoText}>Id: {customerData ? customerData.customerId : 'N/A'}</Text>
      <Text style={styles.infoText}>Điểm đón: {pickupLocation.formattedAddress}</Text>
      <Text style={styles.infoText}>Điểm đến: {destination.formattedAddress}</Text>
      <Text style={styles.infoText}>Khoảng cách: {routeDistance} km</Text>
      <Text style={styles.infoText}>Loại xe: {selectedCarType}</Text>
      <Text style={styles.infoText}>Thời gian dự kiến: {routeDuration} phút</Text>
      <Text style={styles.infoText}>Giá cước: {totalPrice} VND</Text>
      <Button title="Tìm tài xế" onPress={handleFindDriver} />
    </View>
  );
};

const styles = StyleSheet.create({
  infoBox: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, 
    margin: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InfoBox;
