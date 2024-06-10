import React, { useState } from 'react';
import { StyleSheet, View, Button, Modal, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import FindDriver from '@/components/findDriver';

export default function FindDriverScreen() {
  return (
    <View style={styles.container}>
      <ThemedView style={styles.findContainer}>
        <FindDriver />
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
