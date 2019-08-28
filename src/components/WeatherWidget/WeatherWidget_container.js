import {formatDate} from "../utils";

/**
 * Converts unix timestamp to milliseconds
 * @param stamp - unix timestamp
 * @returns {string} DD month YYYY
 */
let time = stamp => formatDate(stamp * 1000);

/**
 * Rounds temperature
 * @param {number}temp - decimal, in Celsius
 * @returns {number}
 */
let temperature = temp => Math.round(temp);

/**
 * Converts humidity for percent value
 * @param {number}hum number from 0 to 1
 * @returns {number}
 */
let humidity = hum => Math.round(hum * 100);

/**
 * Rounds pressure
 * @param {number}press decimal, in hectopascals
 * @returns {number}
 */
let pressure = press => Math.round(press);

/**
 * Returns appropriate icon symbol - for icon image
 * @param {string }icon
 * @returns {string} image-icon-name
 */
function getWeatherIcon(icon) {
    switch (icon) {
        case "clear-day":
            return "day-sunny";
        case "clear-night":
            return "night-clear";
        case "cloudy":
            return "day-cloudy";
        case "partly-cloudy-night":
            return "night-cloudy";
        case "rain":
            return "rain";
        case "snow":
            return "snow";
        case "sleet":
            return "sleet";
        case "wind":
            return "windy";
        case "fog":
            return "fog";
        case "partly-cloudy-day":
            return "day-cloudy";
        default:
            return "meteor";
    }
}

/**
 * Returns json data from DarkSkyApi
 * @returns {Promise<any>}
 */
export const fetchWeatherData = () => {
    return fetch(process.env.REACT_APP_WEATHER_URL, {
        method: 'GET',
        headers: {
            "Accept": 'application/json',
            "X-Requested-With": "XMLHttpRequest",
        }
    })
        .then(resp => resp.json())
};

/**
 * Filters
 * @param {object} weatherData
 * @param  myKeys - keys to filter
 * @returns {object} filtered data
 */
export let filterWeatherData = (weatherData, myKeys) => {
    return Object.keys(weatherData)
        .filter(key => myKeys.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: weatherData[key]
            };
        }, {});

};

/**
 * Returns formatted weather data
 * @param weatherData
 * @returns {*}
 */
export const formatWeatherData = (weatherData) => {
    weatherData["time"] = time(weatherData["time"]);
    weatherData["temperature"] = temperature(weatherData["temperature"]);
    weatherData["icon"] = getWeatherIcon(weatherData["icon"]);
    weatherData["humidity"] = humidity(weatherData["humidity"]);
    weatherData["pressure"] = pressure(weatherData["pressure"]);
    return weatherData
};