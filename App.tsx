import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Country from './src/screens/Country';
import State from './src/screens/State';
import Search from './src/screens/Search';
import {NavigationContainer} from '@react-navigation/native';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/graphql',
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Country" component={Country} />
        <Stack.Screen name="State" component={State} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Main/>
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    height:'100%',
  },
});
