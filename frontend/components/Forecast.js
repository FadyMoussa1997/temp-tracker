import { Text, View, StyleSheet, ImageBackground, Image, Button, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
const rainLogo = require("../assets/rain.png");
const cloudsLogo = require("../assets/clouds.png");
const clearLogo = require("../assets/clear.png");








export default function Forecast(props) {






  return (


    <View style={styles.innerContainer}  >

      <Text style={styles.message}>{props.day}</Text>

      <Text style={styles.message}>{props.temp}°</Text>

      <Text style={styles.message}>{props.condition}</Text>

      {props.condition === "Rain" && (

        <Image source={rainLogo} style={styles.logo} />
      )}

      {props.condition === "Clouds" && (
        <Image source={cloudsLogo} style={styles.logo} />
      )}


      {props.condition === "Clear" && (

        <Image source={clearLogo} style={styles.logo} />
      )}




    </View>




  )



}



const styles = StyleSheet.create({





  innerContainer: {
    height: 190,
    width: 140,
    backgroundColor: 'rgba(0,0,0,0.4)',



    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,

    borderColor: '#1AFF92',
    
    borderWidth: 2,

    shadowColor: '#000',
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,

    margin: 20,
    


  },

  message: {
    fontSize: 20,
    
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

    marginBottom: 5


  }



})