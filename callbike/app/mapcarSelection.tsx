import React, { useState } from 'react';
import { StyleSheet, View, Button, Modal, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import CarSelection from '@/components/carSelection';
import MapDirection from '@/components/mapDirection';
import InfoBox from '@/components/infoBox';

export default function CarSelectionScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleInfoPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.mapContainer}>
        <MapDirection />
      </ThemedView>

      <ThemedView style={styles.carContainer}>
        <CarSelection />
      </ThemedView>

      {/* <ThemedView style={styles.infoContainer}>
        <InfoBox />
      </ThemedView> */}


      <View style={styles.submitButton}>
        <Button title="Tìm xe" onPress={handleInfoPress} />
        {/* <Button title="Hẹn xe" onPress={handleInfoPress} /> */}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <InfoBox />
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  carContainer: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 20,
  },
  submitButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#000',
  },
});