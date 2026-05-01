export const processData = (weatherData) => {

    console.log(weatherData);

    if (!weatherData) return;

    const {address, currentConditions, days, description} = weatherData;

    return {
        address,
        currentConditions,
        days,
        description
    }
};

