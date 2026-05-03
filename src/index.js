import "./cssStyle/default.css";
import { fetchCurrentLocation, fetchWeatherWithCurrentLocation, fetchWeatherWithCityName, getWeather } from "./appLogic/weather.js";
import { processData } from "./appLogic/processData.js";
import { renderWeatherData, renderDailyTemp, renderHourlyTemp, showActiveNavBtn, showErrorImage, addTempUnitChangerElement} from "./dom/domFunctions.js";
import { loadWeatherIcon, filterhours, activeNightMode, switchTempUnit } from "./utils/util.js";
import { spinner } from "./dom/spinner.js";
import { notyf } from "./dom/notyf.js";


init()
clickHandler();


function init() {
    document.addEventListener('DOMContentLoaded', async () => {
        showActiveNavBtn();
        tempUnitChangerHandler();
        spinner.initialize();
        spinner.loadSpinner()
        const location = await fetchCurrentLocation()

            .catch((responseError) => {
                showErrorImage()
                notyf.error(`Failed to load location ${responseError.message}`);
        })
            .finally(() => {
                spinner.stopSpinner()
            });

        if (!location) return

        if (!location || location.accuracy > 5000) {
            const searchValue = document.querySelector('.searchBar');
            searchValue.focus();
        }

        if (location.accuracy > 5000) notyf.error('we could not resolve your accurate location, use manual search') 

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

        
        const data = dataSaver.getData()
        
        if (data) {

            if (event.closest('.today')) {
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

        }
    } )
}


function tempUnitChangerHandler() {
    addTempUnitChangerElement()
    const select = document.querySelector('select');

    select.addEventListener('change', () => {
        
        const tempUnit = select.value;
        
        const condition = document.querySelectorAll('.temp-conditions');
        condition.forEach((element) => {
            const value = parseFloat(element.textContent);
            
            element.innerHTML = `${switchTempUnit(tempUnit, value)}`;
        })
    })
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
