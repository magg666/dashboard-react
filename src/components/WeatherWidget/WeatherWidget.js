import React from "react";
import './WeatherWidget_style.css'
import './css/weather-icons.css'
import './css/weather-icons.min.css'
import {fetchWeatherData, filterWeatherData, formatWeatherData} from "./WeatherWidget_container";

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

    getCurrentWeather() {
        let myKeys  = Object.keys(this.state.currentDayWeather);
        fetchWeatherData()
            .then(res =>  {
                let filtered = filterWeatherData(res["currently"], myKeys);
                let formatted = formatWeatherData(filtered);
                this.setState({currentDayWeather: formatted})
            })
    }

    componentDidMount() {
        this.getCurrentWeather();
    }

    render() {
        return (
            <div>
                <div className="container" id="app-container">
                    <div className="row">
                        <div className="col-sm-8 col-xs-10" id="weather-container">
                            {/*header*/}
                            <div className="row" id="header">
                                <div className="col-sm-8 title">
                                    <span id="name">{this.state.currentDayWeather.time}</span>
                                </div>
                            </div>

                            <hr/>
                            {/*main temp*/}
                            <div className="row" id="main-weather">
                                <div className="col-sm-3 col-sm-offset-1" id="weather-icon-container">
                                    <i className={`wi wi-${this.state.currentDayWeather.icon}`}></i> new
                                </div>
                                <div className="col-sm-5 col-sm-offset-3" id="current-temp-container">
                                    <span id="current-temp">65</span><i className="wi wi-fahrenheit units"></i>
                                </div>
                            </div>


                            <hr className="divider"/>

                            {/*extra temp*/}
                            <div className="row" id="extra-weather">
                                <div className="col-sm-3 col-xs-6 extra-weather-item">
                                    <i className="wi wi-thermometer"></i> <br/>
                                    <span id="high-temp">69</span><i className="wi wi-fahrenheit units"></i>
                                </div>
                                <div className="col-sm-3 col-xs-6 extra-weather-item">
                                    <i className="wi wi-thermometer-exterior"></i> <br/>
                                    <span id="low-temp">60</span><i className="wi wi-fahrenheit units"></i>
                                </div>
                                <div className="col-sm-3 col-xs-6 extra-weather-item">
                                    <i className="wi wi-humidity"></i> <br/>
                                    <span id="humidity">20</span>%
                                </div>
                                <div className="col-sm-3 col-xs-6 extra-weather-item">
                                    <i className="wi wi-barometer"></i> <br/>
                                    <span id="pressure">5</span> mmHg
                                </div>
                            </div>

                            <hr className="divider"/>
                         </div>
                    </div>
                </div>
            </div>
        )
    }


}


// format data


// render html




