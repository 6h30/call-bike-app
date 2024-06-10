import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
// import { useSelector } from 'react-redux';

const TripComplete = () => {
    // const handleCustomerReview = () => {
    //     router.push({
    //       pathname: '/',
    //     });
    //   };
    return (
        <View style={styles.reviewContainer}>
            <Text style={styles.title}>Hoàn thành chuyến đi!</Text>

            {/* <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Tài xế: {driver.name}</Text>
                <Text style={styles.infoText}>Điểm đến: {destination.formattedAddress}</Text>
                <Text style={styles.infoText}>Thời gian: {routeDuration} phút</Text>
                <Text style={styles.infoText}>Khoảng cách: {routeDistance} km</Text>
            </View> */}

            {/* <Button title="Đánh giá chuyến đi" onPress={handleCustomerReview} /> */}
            <Button title="Đánh giá chuyến đi" />
        </View>
    );
};

const styles = StyleSheet.create({
    reviewContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TripComplete;