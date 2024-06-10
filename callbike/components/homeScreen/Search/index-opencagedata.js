// opencagedata
import React, { Component } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      searchFocused: false,
      selectedLocation: null, // Thêm state để lưu trữ tọa độ đã chọn
    };
  }

  searchPlaces = async (query) => {
    if (query.length < 3) {
      this.setState({ results: [] });
      return;
    }

    const apiKey = 'cd65eb49c25a4ace9e8555b1cca95c33';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&limit=5`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const results = data.results.map(result => ({
        id: result.annotations.geohash,
        name: result.formatted,
        geometry: result.geometry,
      }));
      this.setState({ results });
    } catch (error) {
      console.error('Error searching places:', error);
    }
  };

  handleInputChange = (query) => {
    this.setState({ query }, () => this.searchPlaces(query));
  };

  handleSelectPlace = (place) => {
    this.setState({ 
      query: place.name, 
      results: [], 
      searchFocused: false,
      selectedLocation: {
        latitude: place.geometry.lat,
        longitude: place.geometry.lng,
      }, 
    });
    if (this.props.onLocationSelected) {
      this.props.onLocationSelected({
        latitude: place.geometry.lat,
        longitude: place.geometry.lng,
        title: place.name,
      });
    }
  };

  render() {
    const { query, results, searchFocused, selectedLocation } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={this.handleInputChange}
          value={query}
          placeholder="Nhập điểm đến?"
          onFocus={() => this.setState({ searchFocused: true })}
          onBlur={() => this.setState({ searchFocused: false })}
        />
        {searchFocused && results.length > 0 && (
          <FlatList
            style={styles.listView}
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.handleSelectPlace(item)}>
                <Text style={styles.listItem}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
        {selectedLocation && (
          <Text style={styles.selectedCoordinateText}>
            Latitude: {selectedLocation.latitude}, Longitude: {selectedLocation.longitude}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.select({ ios: 60, android: 40 }),
    width: '100%',
    paddingHorizontal: 20,
  },
  textInput: {
    height: 54,
    borderColor: '#DDD',
    borderWidth: 1,
    paddingLeft: 20,
    backgroundColor: '#FFF',
    borderRadius: 5,
    fontSize: 18,
  },
  listView: {
    backgroundColor: '#FFF',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  listItem: {
    padding: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  selectedCoordinateText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
