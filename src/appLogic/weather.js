// this function fetches current location.
const fetchCurrentLocation = () => {
    return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition((position) => {

            console.log(position.coords.latitude, position.coords.longitude, position.coords.accuracy)

            resolve(
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
              },
            )

        }, (positionError) => {
            reject(
                positionError
            );
        }, 
        {enableHighAccuracy: true, timeout: 15000})
    })
}


const fetchWeatherWithCurrentLocation = async (latitude, longitude) => {

    const weather = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=TTDVDB34E28EX6VBQV5WBNAZ2`).then((response) => {

        if (!response.ok) {
            throw new Error("failed to fetch...");
            return false;
        }

        return response.json()
    })

    return weather;
};


const fetchWeatherWithCityName = async () => {

    const cityName = prompt('enter the location name')

    const weather = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=TTDVDB34E28EX6VBQV5WBNAZ2`).then((response) => {

        if (!response.ok) {
            throw new Error("failed to fetch...");
        }
        return response.json();
    }).catch((error) => {
        console.error(error.message);
        return false;

    })

    return weather;
}
    

export async function getWeather() {

    const location = await fetchCurrentLocation()
    .catch((error) => {
        console.error(`Error Code:${error.code}, ${error.message}`);
        return false;
    })

    if (!location) return;
    
    if (location.accuracy > 5000) {
       return await fetchWeatherWithCityName();
    } else {
       return await fetchWeatherWithCurrentLocation(location.latitude, location.longitude);
    }
    
}