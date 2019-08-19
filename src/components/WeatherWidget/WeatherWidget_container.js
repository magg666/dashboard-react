import {formatDate} from "../utils";

let time = stamp => formatDate(stamp*1000);
let temperature = temp => Math.round(temp);
let humidity = hum => hum * 100;
let pressure = press => Math.round(press);


function getWeatherIcon(icon){
  switch(icon){
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

export const formatWeatherData = (weatherData) => {
    weatherData["time"] = time(weatherData["time"]);
    weatherData["temperature"] = temperature(weatherData["temperature"]);
    weatherData["icon"] = getWeatherIcon(weatherData["icon"]);
    weatherData["humidity"] = humidity(weatherData["humidity"]);
    weatherData["pressure"] = pressure(weatherData["pressure"]);
    return weatherData
};