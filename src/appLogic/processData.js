export const processData = (weatherData) => {

    if (!weatherData) return;

    const {address, currentConditions, days, description} = weatherData;

    return {
        address,
        currentConditions,
        days,
        description
    }
};

