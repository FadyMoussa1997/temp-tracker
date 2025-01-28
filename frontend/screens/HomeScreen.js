import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, Button, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from 'axios';
import Humidity from '../components/Humidity';
import Wind from '../components/Wind';
import FeelsLike from '../components/FeelsLike';
import Pressure from '../components/Pressure';
import Visibility from '../components/Visibility';
import CityName from '../components/CityName';
import SunSet from '../components/SunSet';
import LiveMap from '../components/LiveMap';
const logo = require("../assets/weatherHome.jpg");
const searchLogo = require("../assets/search.png");

const API_BASE_URL = 'http://172.27.208.1:3000';


const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    let hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    return hours + ':' + minutes.substr(-2) + ' ' + ampm;
}









export default function HomeScreen() {

    const navigation = useNavigation();


    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);


    const movefunc = () => {
        navigation.navigate("Favorites");
    }


    const getWeatherData = async () => {
        try {
            setWeatherData(null);
            const response = await axios.get(`http://172.20.192.1:3000/weatherdata`, {
                params: {
                    city: city // Pass the city to your API endpoint
                }
            });
            //console.log('Weather data:', response.data); // Log the response data for debugging
            // Update state or do something with the weather data received
            setWeatherData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeatherData(null);
            // Handle errors here
        }
    }


    let sunsett = '';
    if (weatherData) {
        sunsett = formatTime(weatherData.sys.sunset);
    }









    return (


        <SafeAreaView style={styles.container}>

            <ImageBackground source={logo} style={styles.image}>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Search for a City'
                        placeholderTextColor="#FFFFFF"
                        value={city}
                        onChangeText={text => setCity(text)}
                    />

                    <TouchableOpacity style={styles.searchContainer} onPress={movefunc}>

                        <Image source={searchLogo} style={styles.logo} />

                    </TouchableOpacity>




                </View>






                <ScrollView contentContainerStyle={styles.scrollViewContent}>

                    {weatherData && (

                        <>



                            <CityName name={weatherData.name} temperature={Math.round(weatherData.main.temp)} descriptionn={weatherData.weather[0].description}
                                temp_max={Math.round(weatherData.main.temp_max)} temp_min={Math.round(weatherData.main.temp_min)} />


                            <LiveMap
                                latitude={weatherData.coord.lat}
                                longitude={weatherData.coord.lon}
                                latitudeDelta={0.05}
                                longitudeDelta={0.05}
                            />





                            <View style={styles.twoItem}>
                                <Humidity humidity={weatherData.main.humidity} />
                                <Wind wind={weatherData.wind.speed} />
                            </View>

                            <View style={styles.twoItem}>
                                <FeelsLike feels_like={weatherData.main.feels_like} />
                                <Pressure pressure={weatherData.main.pressure} />
                            </View>

                            <View style={styles.twoItem}>
                                <Visibility visibility={weatherData.visibility / 1000} />
                                <SunSet humidity={sunsett} />

                            </View>


                        </>
                    )}

                </ScrollView>
            </ImageBackground>

        </SafeAreaView>







    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,


    },

    image: {
        // height: '100%',
        // width: '100%'
        flex: 1,
    },

    scrollViewContent: {
        flexGrow: 1

    },


    inputContainer: {

        height: 50,
        flexDirection: "row",
        justifyContent: 'space-between',


        backgroundColor: 'rgba(0,0,0,0.4)',

        borderRadius: 10,
        borderColor: 'rgb(192, 192, 192)',
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,

        margin: 10


    },


    textInput: {

        width: '60%',

        fontSize: 20,
        fontWeight: 'bold',

        color: '#FFFFFF',
        paddingHorizontal: 10,
        height: '100%',
    },

    logo: {

        padding: 10,

        height: 30,
        width: 30,

        resizeMode: 'stretch',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: 20,


    },

    searchContainer: {






        alignItems: 'center',
        alignSelf: 'center',



    },

    twoItem: {

        flexDirection: "row",
        justifyContent: 'space-between',

    }



})