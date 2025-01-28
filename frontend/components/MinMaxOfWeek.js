import { Text, View, StyleSheet, ImageBackground, Image, Button, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const humidityIcon = require("../assets/hum.png");
const coldFace = require("../assets/coldface.png");
const hotFace = require("../assets/hotface.png");






export default function MinMaxOfWeek(props) {


  const navigation = useNavigation();



  return (


    <View style={styles.innerContainer}  >

      <View style={styles.twoItem}>


        <View style={styles.smallContainer}>

          <Text style={styles.message}>Minimum Temp</Text>

          <Image source={coldFace} style={styles.logo} />

          <Text style={styles.info}>{props.minTempValue}°</Text>

          <Text style={styles.info}>{props.minTempDate}</Text>

        </View>


        <View style={styles.smallContainer}>

          <Text style={styles.message}>Maximum Temp</Text>

          <Image source={hotFace} style={styles.logo} />

          <Text style={styles.info}>{props.maxTempValue}°</Text>

          <Text style={styles.info}>{props.maxTempDate}</Text>

        </View>

      </View>


      <View style={styles.average}>

        <Text style={styles.info}>Average Temp</Text>
        <Text style={styles.info}>{props.average.toFixed(1)}°</Text>
      </View>




    </View>




  )



}



const styles = StyleSheet.create({





  innerContainer: {
    height: 600,
    width: 380,
    backgroundColor: 'rgba(0,0,0,0.4)',

    flexDirection: "column",
    justifyContent: 'space-between',





    borderRadius: 10,

    borderColor: '#78FFC9',

    borderWidth: 2,

    shadowColor: '#000',
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,

    marginTop: 20,
    marginBottom: 20,
    marginLeft: 2,
    marginRight: 2,
    padding: 10,


  },


  smallContainer: {



    alignItems: 'center',
    justifyContent: 'space-around',






  },

  message: {
    fontSize: 20,

    paddingBottom: 15,
    color: '#FFFFFF',



  },

  info: {
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


  },

  twoItem: {

    flexDirection: "row",
    justifyContent: 'space-between',
    height: 400,
    flex: 1,
    borderBottomEndRadius: 2,
    borderWidth: 2,
    borderBottomColor: '#78FFC9',

  },

  average: {



    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  }



})