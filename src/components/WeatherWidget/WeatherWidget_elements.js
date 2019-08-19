import React from "react";

/**
 * Renders header for weatherWidget. Displays date and town (town is hardcoded)
 * @param props
 * @returns {*}
 * @constructor
 */

export function WeatherHeader(props) {
    return (
        <div className="row" id="header">
            <div className="col-sm-12">
                <span className="left">{props.time}</span>
                <span className="right">Warsaw</span>
            </div>
        </div>
    )
}

/**
 * Renders main weather panel. Displays icon, temperature, summary
 * @param props
 * @returns {*}
 * @constructor
 */
export function WeatherMain(props) {
    return (
        <div className="row" id="main-weather">
            <div className="col-sm-6" id="weather-icon-container">
                <i className={`wi wi-${props.icon}`}/>
            </div>
            <div className="col-sm-6" id="current-temp-container">
                <span id="current-temp">{props.temperature}</span><i className="wi wi-celsius units"/>
            </div>
            <div className="col-sm-12" id="summary-container">
                <span id="summary">{props.summary}</span>
            </div>
        </div>
    )
}

/**
 * Renders bottom panel of weather widget. Displays humidity, wind speed, pressure
 * @param props
 * @returns {*}
 * @constructor
 */
export function WeatherBottom(props) {
    return (
        <div className="row" id="extra-weather">
            <div className="col-sm-4 col-xs-6 extra-weather-item">
                <i className="wi wi-humidity"/><br/>
                <span id="humidity">{props.humidity}</span>%
            </div>
            <div className="col-sm-4 col-xs-6 extra-weather-item">
                <i className="wi wi-small-craft-advisory"/><br/>
                <span id="wind">{props.windSpeed}</span>m/s
            </div>
            <div className="col-sm-4 col-xs-6 extra-weather-item">
                <i className="wi wi-barometer"/> <br/>
                <span id="pressure">{props.pressure}</span>hPa
            </div>
        </div>
    )
}

