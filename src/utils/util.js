import { format, parse } from "date-fns";


export function clearDiv(element) {

    element.innerHTML = '';
}


export async function loadWeatherIcon(icon) {

    const time = new Date();
    const now = time.getHours()

    let color;

    if (now <= 8 || now >= 19) {
        color = '1st Set - Monochrome';
    } else {
        color = '1st Set - Color';
    }

    const image = await import(`../image/${color}/${icon}.svg`)
    .then(icon => icon.default)
    .catch(() => {
        return "../image/1st Set - Color/cloudy.svg";
    })

    return image;
}

export function myDateFormatter(dateString) {
    const myDate = parse(dateString, 'yyyy-MM-dd', new Date());

    return format(myDate, 'EEEE, dd');
};


export function filterhours(time) {

    const now = new Date();
    const then = parse(time, 'HH:mm:ss', now);

    return now <= then
    
};


export function switchTempUnit(unit = 'F', value) {

    if (!value) return

    if (unit === 'C') {
        const temp = (value - 32) * 5/9;
        return `${temp.toFixed(1)} ${'\u00B0'}C`;
    } else {
        const temp = (value * 9/5) + 32;  
        return `${temp.toFixed(1)} ${'\u00B0'}F`;
    }
};