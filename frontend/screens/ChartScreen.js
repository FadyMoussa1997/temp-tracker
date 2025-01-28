import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { LineChart, BarChart, ProgressChart } from 'react-native-chart-kit';

const logo = require("../assets/weatherHome.jpg");


import MinMaxOfWeek from '../components/MinMaxOfWeek';



export default function ChartSceen({ route }) {

    const { weatherData, dailyForecasts, cityName } = route.params;

    const [chartLabel, setChartLabel] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [maxTemp, setMaxTemp] = useState(null);
    const [minTemp, setMinTemp] = useState(null);
    const [maxTempIndex, setMaxTempIndex] = useState(null);
    const [minTempIndex, setMinTempIndex] = useState(null);
    const [averageTemp, setAverageTemp] = useState(null);

    const screenWidth = Dimensions.get("window").width;

    const navigation = useNavigation();

    useEffect(() => {
        console.log("Daily forecasts length in CHART: ", dailyForecasts.length);
        loadChartData();
        loadChartLabel();
    }, [dailyForecasts]);

    

    


    useEffect(() => {

        if (chartData.length >= 6) {

            const maximumTemp = Math.max(...chartData);
            const maximumTempIndex = chartData.indexOf(maximumTemp);
            

                setMaxTemp(maximumTemp);
            setMaxTempIndex(maximumTempIndex);
            

            const sum = chartData.reduce((previous, next) => previous + next, 0);
            const average = sum / chartData.length;
            setAverageTemp(average);

            if (maximumTemp) {
                const minimumTemp = Math.min(...chartData);
                const minimumTempIndex = chartData.indexOf(minimumTemp);

                setMinTemp(minimumTemp);
                setMinTempIndex(minimumTempIndex);
                
            }
        }
    }, [chartData])


    


    const formatDate = (dateString) => {
        const parts = dateString.split(' ')[0].split('-');
        return `${parts[1]}/${parts[2]}`; // Extracts MM-DD
    }





    const loadChartData = () => {

        let temporaryData = []

        if (weatherData) {
            temporaryData.push(Math.round(weatherData.main.temp));

        }

        dailyForecasts.forEach(day => {
            temporaryData.push(Math.round(day.main.temp));
        });

        setChartData(temporaryData);

    }


    const loadChartLabel = () => {

        let temporaryLabel = []

        if (weatherData) {
            temporaryLabel.push(formatDate(weatherData.dt_txt));
        }

        dailyForecasts.forEach(day => {
            temporaryLabel.push(formatDate(day.dt_txt))
        })

        setChartLabel(temporaryLabel);
    }

    const chartConfig = {
        backgroundGradientFrom: "#000000", 
        backgroundGradientFromOpacity: 0.8,
        backgroundGradientTo: "#333333", 
        backgroundGradientToOpacity: 0.8,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, 
        strokeWidth: 3,
        barPercentage: 0.7,
        useShadowColorFromDataset: false,
        decimalPlaces: 0,
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
    };


    const data = {
        labels: chartLabel,
        datasets: [
            {
                data: chartData,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, 
                strokeWidth: 2 
            }
        ],
        legend: ["6-DAYS FORECAST"] 
    };






    return (

        <SafeAreaView style={styles.container}>
            <ImageBackground source={logo} style={styles.image}>

                <ScrollView>


                    {chartLabel.length >= 6 && chartData.length >= 6 && (

                        <>

                        <Text style={styles.cityName}>{cityName}</Text>

                            <LineChart
                                data={data}
                                width={screenWidth}
                                height={500}
                                chartConfig={chartConfig}
                                yAxisSuffix="°C"
                            />

                            <BarChart

                                data={data}
                                width={screenWidth}
                                height={400}
                                yAxisSuffix="°C"
                                chartConfig={chartConfig}
                                verticalLabelRotation={30}
                            />







                        </>

                    )}



                    {maxTemp != null &&
                        minTemp != null &&
                        maxTempIndex != null &&
                        minTempIndex != null &&
                        averageTemp != null &&
                        chartLabel?.length >= 6 && (
                            <View>
                                <MinMaxOfWeek
                                    minTempValue={minTemp}
                                    minTempDate={chartLabel[minTempIndex] || "N/A"}
                                    maxTempValue={maxTemp}
                                    maxTempDate={chartLabel[maxTempIndex] || "N/A"}
                                    average={averageTemp}
                                />
                            </View>
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
        
        flex: 1,
    },

    cityName: {
        
        fontSize: 50,
        color: '#1AFF92',
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0.4)',
       
    }
})