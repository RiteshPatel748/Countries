import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity,} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import CountryItem from '../components/CountryItem';


const Country = () => {
    const route=useRoute();
    const  navigation= useNavigation();
    const GET_COUNTRIES = gql`
    query Query($code: ID!){
        continent(code: $code){
            countries {
                native
                currency
                capital
                emoji
                code
                name
            }
            code
            name
        }
    }
    `;
  const { loading, error, data } = useQuery(GET_COUNTRIES,{
    variables:{code:route.params?.code},
  });

  if (loading) return<View style={styles.container}><Text style={[styles.countryName,{fontSize:20}]}>Loading...</Text></View> ;
  if (error) return <Text>Error : {error.message}</Text>;
//   if(data){console.log(data)}


  return (
    <View style={styles.container}>
      <Text style={[styles.countryName,{fontSize:25,marginBottom:20,marginTop:15}]}>{data.continent.name}</Text>
      <FlatList
        data={data.continent.countries}
        renderItem={({ item }) => <CountryItem country={item} />}
        keyExtractor={item => item.code}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  countryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"#000000"
  },
});

export default Country;