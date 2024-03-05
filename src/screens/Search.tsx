import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button, Image,} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import CountryItem from '../components/CountryItem';


const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [Data, setData] = useState();
    const route=useRoute();
    const  navigation= useNavigation();
    const GET_COUNTRIES = gql`
    query Query{
        countries {
            native
            currency
            capital
            emoji
            code
            name
        }
    }
    `;
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return<View style={styles.container}><Text style={[styles.countryName,{fontSize:20}]}>Loading...</Text></View> ;
  if (error) return <Text>Error : {error.message}</Text>;
//   if(data&&!Data){setData(data)}
//   console.log(Data)

  const applyFiltersAndSearch = () => {
    let filteredData = data.countries;
  
    if (searchQuery) {
      filteredData = filteredData.filter((data) =>
        `${data.name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ); 
    }
    setData(filteredData);
    // console.log(filteredData)
    console.log(Data)
  }

  return (
    <View style={styles.container}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:10,}}>
            <TextInput
                placeholder="Country Name"
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
                style={{borderWidth:1,width:'85%',borderRadius:10,paddingHorizontal:10}}
            />
            <TouchableOpacity style={{width:40,height:40,alignSelf:'flex-end',marginLeft:10}} onPress={applyFiltersAndSearch}>
                <Image source={require('../images/searchIcon.png')} style={{width:35,height:35}}/>
            </TouchableOpacity>
        </View>
        <View style={{width:'100%'}}>
        {(Data)&&<FlatList
            data={Data}
            renderItem={({ item }) => <CountryItem country={item} />}
            keyExtractor={item => item.code}
        />}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    width:'100%',
    // justifyContent:'center',
    alignItems:'center',
  },
  countryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"#000000"
  },
});

export default Search;