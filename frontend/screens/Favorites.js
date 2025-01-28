import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, Button, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import axios from 'axios';
import Humidity from '../components/Humidity';
import Wind from '../components/Wind';
import FeelsLike from '../components/FeelsLike';
import Pressure from '../components/Pressure';
import Visibility from '../components/Visibility';
import CityName from '../components/CityName';
import SunSet from '../components/SunSet';
import Forecast from '../components/Forecast';
import LiveMap from '../components/LiveMap';
const logo = require("../assets/weatherHome.jpg");
const searchLogo = require("../assets/search.png");
const calendarLogo = require("../assets/calendar.png");
const barChartLogo = require("../assets/barChart.png");





const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    let hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    return hours + ':' + minutes.substr(-2) + ' ' + ampm;
}





export default function Favorites() {

    const navigation = useNavigation();


    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [dailyForecasts, setDailyForecasts] = useState([]);
    const [cityName, setCityName] = useState("");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);




    useEffect(() => {
        console.log("Daily forecasts length: ", dailyForecasts.length);
        setDataLoaded(true);
    }, [dailyForecasts]);



    const getForecastData = async () => {
        // Reset states before fetching data
        setWeatherData(null);
        //setCity("");
        setDailyForecasts([]);
        setCityName("");
        setLat("");
        setLon("");

        if (!city.trim()) {
            console.error('City name is required');
            return;
        }

        try {
            setDataLoaded(false);
            const response = await axios.get(`http://192.168.1.17:3000/forecastdata`, {
                params: {
                    city: city.trim()
                }
            });

            if (response.data) {
                console.log("Response data: FETCHEDDDD");

                if (response.data.list) {

                    setWeatherData(response.data.list[0]);
                    const daily = response.data.list.filter(day => day.dt_txt.includes('00:00:00'));
                    setDailyForecasts(daily);
                    //setDailyForecasts(response.data.list);
                    //console.log("daily length: "+dailyForecasts.length);

                    if (dailyForecasts.length > 0) {
                        console.log("daily length: " + dailyForecasts.length);
                    }
                } else {
                    console.warn("No list found in response data");
                }

                if (response.data.city) {
                    setCityName(response.data.city.name);
                    setLat(response.data.city.coord.lat);
                    setLon(response.data.city.coord.lon);

                    console.log("coord lat: " + response.data.city.coord.lat);
                    console.log("city name: " + response.data.city.name);
                } else {
                    console.warn("No city information found in response data");
                }
                
            } else {
                console.warn("No data found in response");
            }

        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeatherData(null);
            setDailyForecasts([]);
            setCityName("");
            setLat("");
            setLon("");
        } finally {
            setDataLoaded(true);
        }
    };

    const moveToChart = () => {
        navigation.navigate("ChartScreen", {
            weatherData: weatherData,
            dailyForecasts: dailyForecasts,
            cityName: cityName,
        });
    };




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
                    <TouchableOpacity style={styles.searchContainer} onPress={getForecastData}>
                        <Image source={searchLogo} style={styles.logo} />
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {dailyForecasts.length > 4 && weatherData && dataLoaded && (
                        <>

                            <CityName
                                name={cityName}
                                temperature={Math.round(weatherData.main.temp)}
                                descriptionn={weatherData.weather[0].description}
                                temp_max={Math.round(weatherData.main.temp_max)}
                                temp_min={Math.round(weatherData.main.temp_min)}
                            />

                            {lat && lon && dataLoaded && (
                                <LiveMap
                                    latitude={lat}
                                    longitude={lon}
                                    latitudeDelta={0.05}
                                    longitudeDelta={0.05}
                                />
                            )}



                            <View style={styles.twoItem}>
                                <Humidity humidity={dailyForecasts[0].main.humidity} />
                                <Wind wind={dailyForecasts[0].wind.speed} />
                            </View>
                            <View style={styles.twoItem}>
                                <FeelsLike feels_like={dailyForecasts[0].main.feels_like} />
                                <Pressure pressure={dailyForecasts[0].main.pressure} />
                            </View>
                            <View style={styles.twoItem}>
                                <Visibility visibility={dailyForecasts[0].visibility / 1000} />
                            </View>

                            <View style={styles.flatView}>

                                <View style={styles.foreContainer}>

                                    <Image source={calendarLogo} style={styles.logo} />

                                    <Text style={styles.forecastText}>5-DAY FORECAST</Text>


                                </View>

                                <FlatList
                                    data={dailyForecasts}
                                    horizontal

                                    renderItem={({ item }) => <Forecast day={item.dt_txt.split(' ')[0]} temp={Math.round(item.main.temp)} condition={item.weather[0].main} />


                                    }

                                />

                            </View>


                            <TouchableOpacity style={styles.analysisContainer} onPress={moveToChart}>

                                <Text style={styles.analysisText}>Click To See Forecast Data Analysis</Text>
                                <Image source={barChartLogo} style={styles.logo} />

                            </TouchableOpacity>


                        </>
                    )}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );

}


const styles = StyleSheet.create({

    container: {
        flex: 1,


    },

    image: {
        // height: '100%',
        // width: '100%',
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
        shadowOffset: { width: 3, height: 6 }, // shadow offset
        shadowOpacity: 0.8, // shadow opacity
        shadowRadius: 2, // shadow radius
        elevation: 5, // adds elevation for shadow on Android

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
        width: '100%',

    },


    forecastText: {

        //  margin: 20,


        fontSize: 30,
        fontWeight: 'bold',

        color: '#FFFFFF',
        //paddingHorizontal: 10,
        alignItems: 'center',
        alignSelf: 'center',




    },

    foreContainer: {

        height: 50,
        width: '100%',
        flexDirection: "row",
        justifyContent: 'space-evenly',


        backgroundColor: 'rgba(0,0,0,0.4)',

        borderRadius: 10,
        borderColor: '#1AFF92',
        borderWidth: 2,

        shadowColor: '#000',
        shadowOffset: { width: 3, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginTop: 20




    },


    flatView: {
        marginBottom: 30
    },

    analysisText: {

        fontSize: 20,
        fontWeight: 'bold',

        color: '#FFFFFF',
        //color: 'red',
        paddingHorizontal: 10,
        alignItems: 'center',
        alignSelf: 'center',


    },

    analysisContainer: {

        height: 50,
        width: '100%',
        flexDirection: "row",
        justifyContent: 'space-evenly',


        backgroundColor: 'rgba(0,0,0,0.4)',


        borderRadius: 10,
        borderColor: 'red',
        borderWidth: 2,

        shadowColor: '#000',
        shadowOffset: { width: 3, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: 40




    },



})