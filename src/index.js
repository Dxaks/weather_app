import "./cssStyle/default.css";
import { fetchCurrentLocation, fetchWeatherWithCurrentLocation, fetchWeatherWithCityName, getWeather } from "./appLogic/weather.js";
import { processData } from "./appLogic/processData.js";
import { renderWeatherData, renderDailyTemp, renderHourlyTemp } from "./dom/domFunctions.js";
import { loadWeatherIcon, filterhours } from "./utils/util.js";
import { spinner } from "./dom/spinner.js";


init()
clickHandler();


function init() {
    document.addEventListener('DOMContentLoaded', async () => {

        spinner.initialize();

        const location = await fetchCurrentLocation().catch((responseError) => {
            console.error(`Error code ${responseError.code}: ${responseError.message}`)
            return false;
        });

        if (!location || location.accuracy > 5000) {
            const searchValue = document.querySelector('.searchBar');
            searchValue.focus();
        }

        const weatherData = await fetchWeatherWithCurrentLocation(location.latitude, location.longitude);

        const data = processData(weatherData)
        
        if (!data) return;
         
        renderWeatherData(data);

        // save the processed data for other handlers
        dataSaver.setDailyWeather(data);
        dataSaver.setData(data);
    })
}


function clickHandler() {

    document.addEventListener('click', async (e) => {

        const event = e.target;

        if (event.closest('.searchBtn')) {

            const searchBar = document.querySelector('.searchBar');
            const searchValue = searchBar.value; 

            const weatherData = await fetchWeatherWithCityName(searchValue);
            const data = processData(weatherData);

            if (!data) return;

            renderWeatherData(data);

            dataSaver.setDailyWeather(data);
            dataSaver.setData(data)
        }


        if (event.closest('.today')) {
            const data = dataSaver.getData()
            renderWeatherData(data);
        }

        if (event.closest('.daily')) {
            const dayData = dataSaver.getDailyWeather()
            renderDailyTemp(dayData);
        }

        if (event.closest('.hourly')) {
            const data = dataSaver.getDailyWeather();
            const hourlyData = data[0].hours;
            renderHourlyTemp(hourlyData);
        }

    } )
}


function save() {

    let dailyWeather;
    let data;

    function setData(weatherObject) {
        data = weatherObject 
    }

    function getData(weatherObject) {
        return data;
    }

    function setDailyWeather(weatherObject) {
        dailyWeather = weatherObject.days
    }

    function getDailyWeather() {
        return dailyWeather   
    }

    return {
        setData,
        getData,
        setDailyWeather,
        getDailyWeather
    }
} 

const dataSaver = save()
