import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView,} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { useRoute } from '@react-navigation/native';


const State = () => {
    const route=useRoute();
    const GET_DATA = gql`
    query Query($code: ID!){
        country(code: $code) {
          continent {
            name
          }
          languages {
            name
            native
            code
          }
          currency
          emoji
          name
          native
          phone
          code
          capital
          states {
            name
            code
          }
        }
      }
    `;
  const { loading, error, data } = useQuery(GET_DATA,{
    variables:{code:route.params?.code},
  });
//code,name
  if (loading) return<View style={styles.container}><Text style={[styles.countryName,{fontSize:20}]}>Loading...</Text></View> ;
  if (error) return <Text>Error : {error.message}</Text>;
//   if(data){console.log(data.country.languages)}

  const StateItem = ({ state }:any) => {
    return (
        <View style={{ flexDirection:'row',justifyContent:'space-between',margin:15,borderBottomWidth:.7,padding:2,borderRadius:0,borderColor:'#888'}}>
            <Text style={styles.countryDetails}>{state.name}</Text>
            <Text style={styles.countryDetails}>{state.code}</Text>
        </View>
        );
      };
  const LanguageItem = ({ lang }:any) => {
    return (
        <View style={{ flexDirection:'row',justifyContent:'space-between',margin:15,borderBottomWidth:.1,padding:2,borderRadius:0,}}>
            <Text style={styles.countryDetails}>{lang.name}</Text>
            <Text style={styles.countryDetails}>{lang.native}</Text>
            <Text style={styles.countryDetails}>{lang.code}</Text>
        </View>
        );
      };
    
    return (
        <ScrollView style={styles.container}>
        <Text style={[styles.countryName,{fontSize:25,marginBottom:20,marginTop:15,textAlign:'center'}]}>{data.country.name}</Text>
        <View style={styles.countryItem}>
            <View style={styles.countryDetailsContainer}>
                <View style={{justifyContent:'center',alignItems:'flex-start',flex:.9}}>
                    {(data.country.capital)&&<Text style={styles.countryDetails}>
                    Capital : {data.country.capital}
                    </Text>}
                    <Text style={styles.countryDetails}>
                    Code : {data.country.code}
                    </Text>
                    {(data.country.currency)&&<Text style={styles.countryDetails}>
                    Currency : {data.country.currency}
                    </Text>}
                    {(data.country.native)&&<Text style={styles.countryDetails}>
                    Native : {data.country.native}
                    </Text>}
                    {(data.country.phone)&&<Text style={styles.countryDetails}>
                    Phone : +{data.country.phone}
                    </Text>}
                    {(data.country.continent.name)&&<Text style={styles.countryDetails}>
                    Continent : {data.country.continent.name}
                    </Text>}
                    {(data.country.states)&&<Text style={styles.countryDetails}>
                    States : {data.country.states.length}
                    </Text>}
                    {(data.country.languages)&&<Text style={styles.countryDetails}>
                    Language : {data.country.languages[0].name}
                    </Text>}
                </View> 
            <Text style={{fontSize:100,fontWeight:'bold',color:'#000'}}>{data.country.emoji}</Text>
            </View>
            {(data.country.languages.length!=0)&&<>
            <Text style={[styles.countryName,{fontSize:25,marginBottom:5,marginTop:20}]}>Languages</Text>
            <View style={{justifyContent:'center',margin:0,padding:0,borderWidth:1,borderRadius:10}}>
                {data.country.languages.map((lang:any)=>{
                    return(<LanguageItem lang={lang}/>)
                })}
            </View>
            </>}
            {(data.country.states.length!=0)&&<>
            <Text style={[styles.countryName,{fontSize:25,marginBottom:5,marginTop:20}]}>States</Text>
            <View style={{justifyContent:'center',margin:0,padding:0,borderWidth:1,borderRadius:10}}>
                {data.country.states.map((state:any)=>{
                    return(<StateItem state={state}/>)
                })}
            </View>
            </>}
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    width:'100%',
  },
  countryDetailsContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    margin:2,
    borderWidth:1,
    padding:10,
    borderRadius:10,

  },
  countryItem: {
    padding: 5,
    margin: 0,
    height:'100%',
    justifyContent:'flex-start',
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

export default State;