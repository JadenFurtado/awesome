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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NetworkInfo } from 'react-native-network-info';

var net = require('react-native-tcp')

const serv = function createServer(){
  const server = net.createServer((socket) => {
    console.log('server connected on ' + socket.address().address);
    socket.write("350");
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
}


const sendPayment = function sendPay(){
  NetworkInfo.getGatewayIPAddress().then(ipAddress => {
    console.log("attempting to connet on"+ipAddress)
    var client = net.createConnection(6666,ipAddress); 
    client.on('error', function(error) {
      console.log(error)
    });
    client.on('data', function(data) {
      console.log('message was received', data)
    });
  });
}


const HomeScreen = ({ navigation }) => {
  
  return (
    <><Button
      title="send data"
      onPress={sendPayment} /><Button
        title="Recieve payment"
        onPress={serv} /></>

  );
};

const RecieverScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={RecieverScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;