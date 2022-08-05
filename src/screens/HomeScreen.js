import React from 'react';
import {Node} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';
var net = require('react-native-tcp')
const Stack = createNativeStackNavigator();
const HomeScreen = ({ navigation }) => { 
    const server = net.createServer((socket) => {
    console.log('server connected on ' + socket.address().address);
    socket.write('excellent!');
    socket.on('data', (data) => {
        console.log(data);
    });

    socket.on('error', (error) => {
        console.log('error ' + error);
    });

    socket.on('close', (error) => {
        console.log('server client closed ' + (error ? error : ''));
    });
    }).listen(6666, () => {
    console.log('opened server on ' + JSON.stringify(server.address()));
    });

    server.on('error', (error) => {
    console.log('error ' + error);
    });

    server.on('close', () => {
    console.log('server close');
    });

    return (
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Jane' })
        }
      />
    );
  };

export default HomeScreen;