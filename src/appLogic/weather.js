import { spinner } from "../dom/spinner.js"

// this function fetches current location.
export const fetchCurrentLocation = () => {
    return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition((position) => {

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
        {enableHighAccuracy: true, timeout: 10000})
    })
}


export const fetchWeatherWithCurrentLocation = async (latitude, longitude) => {

    spinner.loadSpinner()

    console.log(latitude, longitude);

    const weather = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=TTDVDB34E28EX6VBQV5WBNAZ2`).then((response) => {

        if (!response.ok) {
            throw new Error("failed to fetch..", response.status);
        }
        return response.json()
    }).catch((error) => {
        console.error(error.message);
        return false
    }).finally(() => {
        spinner.stopSpinner()
    })
    return weather;
};


export const fetchWeatherWithCityName = async (cityName) => {

    if (!cityName) return;

    spinner.loadSpinner();

    const weather = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=TTDVDB34E28EX6VBQV5WBNAZ2`).then((response) => {

        if (!response.ok) {
            throw new Error("failed to fetch...");
        }
        return response.json();

    }).catch((error) => {
        console.error(error.message);
        return false;
    }).finally(() => {
        spinner.stopSpinner()
    })

    return weather;
};