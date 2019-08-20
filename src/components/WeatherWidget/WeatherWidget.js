import React from "react";
import './WeatherWidget_style.css'
import './css/weather-icons.css'
import './css/weather-icons.min.css'
import {fetchWeatherData, filterWeatherData, formatWeatherData} from "./WeatherWidget_container";
import {WeatherHeader, WeatherMain, WeatherBottom} from "./WeatherWidget_elements";

/**
 * Weather Widget for Warsaw
 */
export default class WeatherWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDayWeather: {
                time: null,
                temperature: null,
                summary: "",
                icon: "",
                humidity: null,
                pressure: null,
                windSpeed: null,
            }
        }
    }

    // Method for getting weather data
    getCurrentWeather() {
        let myKeys = Object.keys(this.state.currentDayWeather);
        fetchWeatherData()
            .then(res => {
                let filtered = filterWeatherData(res["currently"], myKeys);
                let formatted = formatWeatherData(filtered);
                this.setState({currentDayWeather: formatted})
            })
    }

    // checks weather on mounting
    // todo set interval
    componentDidMount() {
        this.getCurrentWeather();
    }

    // clears interval on un-mounting
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <div>
                <div id="app-container">
                    <div className="col-sm-12 col-xs-10" id="weather-container">
                        <WeatherHeader time={this.state.currentDayWeather.time}/>
                        <hr/>
                        <WeatherMain temperature={this.state.currentDayWeather.temperature}
                                     summary={this.state.currentDayWeather.summary}
                                     icon={this.state.currentDayWeather.icon}/>
                        <hr/>
                        <WeatherBottom humidity={this.state.currentDayWeather.humidity}
                                       windSpeed={this.state.currentDayWeather.windSpeed}
                                       pressure={this.state.currentDayWeather.pressure}/>
                        <hr/>
                    </div>
                </div>
            </div>
        )
    }


}


// format data


// render html




