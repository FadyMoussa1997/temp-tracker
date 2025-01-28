import { Text, View, StyleSheet, ImageBackground, Image, Button, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const humidityIcon = require("../assets/hum.png");






export default function Humidity(props) {


  const navigation = useNavigation();



  return (


    <View style={styles.innerContainer}  >

      <Text style={styles.message}>Humidity</Text>

      <Image source={humidityIcon} style={styles.logo} />

      <Text style={styles.message}>{props.humidity} %</Text>




    </View>




  )



}



const styles = StyleSheet.create({





  innerContainer: {
    height: 200,
    width: '45%',
    backgroundColor: 'rgba(0,0,0,0.4)',



    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,

    borderColor: '#78FFC9',
    
    borderWidth: 2,

    shadowColor: '#000',
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,

    margin: 10


  },

  message: {
    fontSize: 30,
    
    paddingBottom: 15,
    color: '#FFFFFF',



  },


  logo: {

    padding: 10,

    height: 50,
    width: 50,

    resizeMode: 'stretch',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15


  }



})