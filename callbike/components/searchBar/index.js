
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setDestination, setPickupLocation } from '../redux/mapSlice';

const API_KEY = 'cd65eb49c25a4ace9e8555b1cca95c33';

const SearchBar = ({ onSearch, isPickupLocation }) => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();

  const handleInputChange = async (text) => {
    setInputText(text);

    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(text)}&key=${API_KEY}&language=vi&pretty=1`);
      const data = await response.json();

      if (data.results) {
        const newSuggestions = data.results.map(result => ({
          formatted: result.formatted,
          geometry: result.geometry,
        }));
        setSuggestions(newSuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error(error);
      setSuggestions([]);
    }
  };

  const handleItemPress = (item) => {
    setInputText(item.formatted);
    setSuggestions([]);
    const locationData = {
      formattedAddress: item.formatted,
      latitude: item.geometry.lat,
      longitude: item.geometry.lng,
    };
    // Gửi dữ liệu lên Redux
    if (isPickupLocation) {
      dispatch(setPickupLocation(locationData));
    } else {
      dispatch(setDestination(locationData));
    }
    onSearch({ latitude: item.geometry.lat, longitude: item.geometry.lng });
  };

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <Text style={styles.suggestionItem}>{item.formatted}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nhập vị trí"
          value={inputText}
          onChangeText={handleInputChange}
        />
        <FlatList
          data={suggestions}
          renderItem={renderSuggestionItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.suggestionsList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  suggestionsList: {
    maxHeight: 200,
    backgroundColor: '#FFF',
  },
  suggestionItem: {
    padding: 10,
  },
});

export default SearchBar;
