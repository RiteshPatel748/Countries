import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity,} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';

 const CountryItem = ({ country }:any) => {
    const  navigation= useNavigation();
    return (
      <TouchableOpacity style={styles.countryItem}  onPress={()=>{navigation.navigate("State",{code:country.code})}}>
        <Text style={styles.countryName}>{country.name}</Text>
        <Text style={styles.countryDetails}>
          {(country.capital)&&`Capital: ${country.capital},`} {(country.code)&&`Code: ${country.code}`}
        </Text>
        <Text style={styles.countryDetails}>
        {(country.currency)&&`Currency: ${country.currency},`} {(country.native)&&`Native: ${country.native}`}
        </Text>
        <Text style={{fontSize:100,fontWeight:'bold',color:'#000'}}>{country.emoji}</Text>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  countryItem: {
    borderWidth: 1,
    borderRadius:10,
    padding: 10,
    margin: 10,
  },
  countryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"#000000"
  },
  countryDetails: {
    fontSize: 16,
    color: '#000',
  },
});

export default CountryItem;