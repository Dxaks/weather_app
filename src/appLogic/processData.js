export const processData = async (weatherData) => {

    const myWeatherData = await weatherData()

    if (!myWeatherData) return;

    const {address, currentConditions, days, description} = myWeatherData;

    return {
        address,
        currentConditions,
        days,
        description
    }
};

