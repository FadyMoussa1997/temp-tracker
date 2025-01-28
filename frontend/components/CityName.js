import { Text, View, StyleSheet, ImageBackground, Image, Button, SafeAreaView, TextInput, TouchableOpacity } from "react-native";

const rainLogo = require("../assets/rain.png");
const cloudsLogo = require("../assets/clouds.png");
const clearLogo = require("../assets/clear.png");



export default function CityName(props) {






    return (

        <View style={styles.cityContainer}>



            <Text style={styles.cityName}>{props.name}</Text>


            <Text style={styles.cityName}>  {props.temperature}°</Text>

            <Text style={styles.citydesc}>{props.descriptionn}</Text>

            {props.descriptionn.includes("clouds") && (

                <Image source={cloudsLogo} style={styles.logo} />
            )}

            {props.descriptionn.includes("rain") && (

                <Image source={rainLogo} style={styles.logo} />
            )}

            {props.descriptionn.includes("clear") && (

                <Image source={clearLogo} style={styles.logo} />
            )}



            <View style={styles.highlow}>

                <Text style={styles.highlowtext}>H: {props.temp_max}°</Text>
                <Text style={styles.highlowtext}>L: {props.temp_min}°</Text>


            </View>



        </View>



    )


}


const styles = StyleSheet.create({





    cityContainer: {
        height: 350,
        width: '80%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',

        borderRadius: 30,

        //borderColor: 'rgba(255, 255, 255, 0.7)',
        borderColor: '#1AFF92',
        borderWidth: 2,


        shadowColor: '#000',
        shadowOffset: { width: 3, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,

        margin: 20
    },


    cityName: {

        fontSize: 50,
        fontWeight: "bold",
        color: 'white',
        paddingBottom: 15,






    },

    citydesc: {

        fontSize: 30,
        fontWeight: "bold",
        color: 'white',




    },


    highlow: {

        flexDirection: 'row',
        justifyContent: 'space-between',


    },


    highlowtext: {
        fontSize: 25,
        fontWeight: "bold",
        color: 'white',
        margin: 15

    },

    logo: {

        padding: 10,

        height: 50,
        width: 50,

        resizeMode: 'stretch',
        alignItems: 'center',
        alignSelf: 'center',

        marginTop: 20


    }
})