
//BEM (Block Element Modifier)
import React from 'react';
import styled from 'styled-components/native';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
// import { Divider, Input, InputField, Icon, MenuIcon } from '@gluestack-ui/themed';

// import iconSearch from '../../assets/images/icon.png';
// import iconMore from '../../assets/images/icon.png';

import { router } from 'expo-router';

function SearchFrame() {
  return (
    <SearchContainer>
      <SearchInput>
        {/* <SearchIcon source={iconSearch} /> */}
        <AntDesign name="search1" size={24} color="black" />


        <SearchTextInput placeholder="Search here..."  placeholderTextColor="#888" />
      </SearchInput>
      <MaterialIcons name="more-vert" size={24} color="black" />
    </SearchContainer>
  );
}

export default SearchFrame;


const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SearchInput = styled.View`
  width: 93%;
  flex-direction: row;
  align-items: center;
`;

const SearchIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;

const SearchTextInput = styled.TextInput`
  flex: 1;
  height: 40px;
  margin-left: 10px;
  padding: 0 10px;
  font-size: 16px;
  border: 2px solid #BF4F74;
  border-radius: 10px;
`;
