import React, { useState } from 'react';
import { StyleSheet, View, Button, Modal, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import TripProgress from '@/components/tripProgress';

export default function FindDriverScreen() {
  return (
    <View style={styles.container}>
      <ThemedView style={styles.findContainer}>
        <TripProgress />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  findContainer: {
    flex: 1,
  },
});
