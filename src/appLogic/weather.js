import { notyf } from "../dom/notyf.js"
import { spinner } from "../dom/spinner.js"
import { showErrorImage } from "../dom/domFunctions.js"

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
        {enableHighAccuracy: true, timeout: 5000})
    })
}


export const fetchWeatherWithCurrentLocation = async (latitude, longitude) => {

    spinner.loadSpinner()

    if (!(latitude || longitude)) return;

    const weather = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=TTDVDB34E28EX6VBQV5WBNAZ2`).then((response) => {

        return response.json()

    }).catch((error) => {
        showErrorImage();
        const myError = `${error.message}: check your connection and try again!!`
        notyf.error(myError);

    }).finally(() => {
        spinner.stopSpinner()
    })
    return weather;
};


export const fetchWeatherWithCityName = async (cityName) => {

    if (!cityName) return;

    spinner.loadSpinner();

    const weather = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=TTDVDB34E28EX6VBQV5WBNAZ2`).then((response) => {

        return response.json();

    }).catch((error) => {

        showErrorImage();
        notyf.error(error.message);

    }).finally(() => {
        spinner.stopSpinner()
    })

    return weather;
};