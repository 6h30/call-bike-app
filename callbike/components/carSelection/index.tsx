import React, { useState, useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import CarButton from '../carButton';
import { setSelectedCarType } from '../redux/carSlice'; 

const CarSelection: React.FC = () => {
  const [selected, setSelected] = useState<'economy' | 'luxury' | 'family'>('economy');
  const dispatch = useDispatch();

  //chon mac dinh là economy len redux
  useEffect(() => {
    dispatch(setSelectedCarType('economy'));
  }, [dispatch]);

  const handleCarSelect = (carType: 'economy' | 'luxury' | 'family') => {
    setSelected(carType);
    dispatch(setSelectedCarType(carType));
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <ThemedText type="title" style={styles.title}>Chọn loại xe!</ThemedText>
      </View>

      <View style={styles.lowerSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CarButton text="economy" active={selected === 'economy'} onPress={() => handleCarSelect('economy')} />
          <CarButton text="luxury" active={selected === 'luxury'} onPress={() => handleCarSelect('luxury')} />
          <CarButton text="family" active={selected === 'family'} onPress={() => handleCarSelect('family')} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  upperSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  lowerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CarSelection;

