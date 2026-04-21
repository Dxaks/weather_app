import { getWeather } from "./appLogic/weather.js";
import { processData } from "./appLogic/processData.js";

console.log(await processData(getWeather))