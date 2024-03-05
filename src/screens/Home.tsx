import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity,} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import Emoji from 'react-native-emoji';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  
  const  navigation= useNavigation();
    const GET_DATA = gql`
    query Query {
      continents {
        code
        name
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return<View style={styles.container}><Text style={[styles.continentName,{fontSize:20}]}>Loading...</Text></View> ;
  if (error) return <Text>Error : {error.message}</Text>;

  const ContinentItem = ({ continent }) => {
    return (
      <TouchableOpacity style={styles.continentItem} onPress={()=>{navigation.navigate("Country",{code:continent.code})}}>
        <Text style={styles.continentName}>{continent.name}</Text>
        <Text style={styles.continentDetails}>
          Code: {continent.code}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.continentName,{fontSize:25,marginBottom:20,marginTop:15}]}>Continents</Text>
      <FlatList
        data={data.continents}
        renderItem={({ item }) => <ContinentItem continent={item} />}
        keyExtractor={item => item.code}
        numColumns={2}
      />
      <TouchableOpacity style={{width:40,height:40,alignSelf:'flex-end'}} onPress={()=>{navigation.navigate("Search",{code:"AS"})}}>
        <Image source={require('../images/searchIcon.png')} style={{width:40,height:40}}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
  },
  continentItem: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius:10,
    padding:10,
    marginVertical: 10,
    marginHorizontal: 15,
    width:150,
    height:80,
    justifyContent:'center',
    alignItems:'center',
  },
  continentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"#000000"
  },
  continentDetails: {
    fontSize: 16,
    color: '#000',
  },
});

export default Home;