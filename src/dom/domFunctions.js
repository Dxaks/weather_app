import { clearDiv, loadWeatherIcon, myDateFormatter, filterhours } from "../utils/util.js";

export async function renderWeatherData(weather) {
    if (!weather) return;

    const contentDiv = document.querySelector('#content');
    clearDiv(contentDiv);

    const weatherSummary = document.createElement('div');
    weatherSummary.className = 'weatherSummary';

    const cityName = document.createElement('h1');
    cityName.className = 'cityName';
    cityName.textContent = weather.address.toUpperCase();

    const condition = document.createElement('h2');
    condition.className = 'temp-conditions';
   
    condition.innerHTML = `${weather.currentConditions.temp} ${'\u00B0'}F`;
    
    const weatherImage = document.createElement('img');
    weatherImage.className = 'weatherImage';
    weatherImage.src = await loadWeatherIcon(weather.currentConditions.icon);

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = weather.description;

    weatherSummary.appendChild(cityName);
    weatherSummary.appendChild(condition);
    weatherSummary.appendChild(weatherImage);
    weatherSummary.appendChild(description);

    const { currentConditions } = weather;

    const { cloudcover, humidity, pressure, solarenergy, solarradiation, sunrise, sunset } = currentConditions;

    const datas = {cloudcover, humidity, pressure, solarenergy, solarradiation, sunrise, sunset};

    const subSummary = document.createElement('div');
    subSummary.className = 'subSummary';
    
    for (const key in datas) {
        
        const para = document.createElement('p');
        para.className = key;
        para.textContent = `${key}:`;

        const span = document.createElement('span');
        span.innerHTML = `${datas[key]}`
        para.appendChild(span);

        subSummary.appendChild(para);
    }
    weatherSummary.appendChild(subSummary);
    contentDiv.appendChild(weatherSummary);
}


export async function renderDailyTemp(days) {

    if (!days) return;

    const contentDiv = document.querySelector('#content');

    const clearInitialDiv = document.querySelector('.weatherSummary');
    const subSummary = document.querySelector('.subSummary');

    if (clearInitialDiv.nextElementSibling) {
        clearInitialDiv.nextElementSibling.remove()
    }

    if (subSummary) {
        subSummary.remove();
    }


    const daysDiv = document.createElement('div');
    daysDiv.className = 'daysDiv'

    for (const day of days) {

        const dayDiv = document.createElement('div');
        dayDiv.className = 'dayDiv';

        const {datetime, conditions, temp, icon} = day;
       
        const dayData = [datetime, conditions, temp, icon];
        
        const myClass = ['date', 'conditions', 'temp-conditions', 'weatherIcon'];

        for (const [index, data] of dayData.entries()) {

            let dataDiv = document.createElement('p');

            dataDiv.className = myClass[index];
            dataDiv.textContent = data;

            if (index === 0) {
                dataDiv.textContent = myDateFormatter(data);   
            } 

            if (index === 2) {
                dataDiv.textContent = `${data} ${'\u00B0'}F`
            }

            if (index === 3) { 
                dataDiv = document.createElement('img');
                dataDiv.src = await loadWeatherIcon(data);
            }

            dayDiv.appendChild(dataDiv)
        }

        daysDiv.appendChild(dayDiv);
        contentDiv.appendChild(daysDiv)
    }
}


export async function renderHourlyTemp(hours) {

    if (!hours) return;

    const filtered = hours.filter((hour) => {
        return filterhours(hour.datetime);
    })

    const contentDiv = document.querySelector('#content');

   const clearInitialDiv = document.querySelector('.weatherSummary');
   const subSummary = document.querySelector('.subSummary');
   
    if (clearInitialDiv.nextElementSibling) {
        clearInitialDiv.nextElementSibling.remove()
    }

    if (subSummary) {
        subSummary.remove();
    }
   
    const hoursDiv = document.createElement('div');
    hoursDiv.className = 'hoursDiv';

    for (const hour of filtered) {

        const hourDiv = document.createElement('div')
        hourDiv.className = 'hourDiv';

        const {datetime, conditions, temp, icon} = hour;
        const hourData = [datetime, conditions, temp, icon];
        const myClass = ['date', 'conditions', 'temp-conditions', 'weatherIcon'];

        for (const [index, data] of hourData.entries()) {

            let dataDiv = document.createElement('p');

            if (index === 3) { 
                dataDiv = document.createElement('img');
                dataDiv.src = await loadWeatherIcon(data);
            }

            dataDiv.className = myClass[index];
            dataDiv.textContent = data;

            if (index === 2) {
                dataDiv.textContent = `${data} ${'\u00B0'}F`    
            }

            hourDiv.appendChild(dataDiv);
        }

        hoursDiv.appendChild(hourDiv);
        contentDiv.appendChild(hoursDiv);
    }
}


export function showActiveNavBtn() {

    const navBtn = document.querySelectorAll('.navBtn')
    navBtn.forEach((btn) => {

        btn.addEventListener('click', (e) => {
  
            navBtn.forEach(button => button.classList.remove('active'))

            const addActiveClass = e.target.closest('.navBtn');
            if (addActiveClass) {
                addActiveClass.classList.add('active');
            }
        })
    })
}

export async function showErrorImage() {
    const body = document.querySelector('body')
    const image = document.createElement('img');
    image.className = 'error';

    const imagePath = await import(`../image/404-error.svg`);

    image.src = await imagePath.default

    body.appendChild(image);
};

export function addTempUnitChangerElement() {

    const span = document.createElement('span');
    span.className = 'tempUnit';
    span.textContent = 'Unit';

    const select = document.createElement('select');
    const fehrenUnit = document.createElement('option');
    fehrenUnit.textContent = 'F';
    select.appendChild(fehrenUnit);

    const tempUnit = document.createElement('option');
    tempUnit.textContent = 'C';
    select.appendChild(tempUnit);

    span.appendChild(select);

    const header = document.querySelector('header')
    header.appendChild(span);
}
