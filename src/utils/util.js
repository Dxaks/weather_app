import { format, parse } from "date-fns";


export function clearDiv(element) {

    element.innerHTML = '';
}


export async function loadWeatherIcon(icon) {

    const image = await import(`../image/1st Set - Color/${icon}.svg`)
    .then(icon => icon.default)
    .catch((error) => {
        return "../image/1st Set - Color/cloudy.svg";
    })

    return image;
}

export function myDateFormatter(dateString) {
    const myDate = parse(dateString, 'yyyy-MM-dd', new Date());

    return format(myDate, 'EEEE, dd');
};

export function convertFehToCel(temp) {
    const tempInCel = (temp - 32) * 5/9;

    return `${tempInCel.toFixed(1)} ${'\u00B0'}C`;
}

export function filterhours(time) {

    const now = new Date();
    const then = parse(time, 'HH:mm:ss', now);

    return now <= then
    
};


