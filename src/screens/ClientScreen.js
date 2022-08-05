import React from 'react';
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
import { NetworkInfo } from 'react-native-network-info';
var net = require('react-native-tcp')
const Stack = createNativeStackNavigator();
const ProfileScreen = ({ navigation, route }) => {
    var client = net.createConnection(6666,"192.168.0.103"); 
    client.on('error', function(error) {
    console.log(error)
    });
    
    client.on('data', function(data) {
    console.log('message was received', data)
    });
    NetworkInfo.getIPV4Address().then(ipAddress => {
    console.log(ipAddress);
    });
    // Get IPv4 IP (priority: WiFi first, cellular second)
    // NetworkInfo.getIPV4Address().then(ipv4Address => {
    //   console.log("IpV4:"+ipv4Address);
    // });
    // Get Default Gateway IP
    NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
    console.log(defaultGateway);
    });
    return <Text>This is {route.params.name}'s profile</Text>;
  };


  export default ProfileScreen;