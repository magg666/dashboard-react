import React, {Component} from "react";
import {formatTime} from "./Clock_container";
import './Clock_style.css'
import {Captions} from "./Clock_container";

/**
 * Clock component with day name, time and captions with time (HH:MM) remaining to define event
 * with help :  https://tutorialscapital.com/
 *              react-native-create-live-digital-clock-using-
 *              local-system-time-android-ios-tutorial/
 */

export default class Clock extends Component {
    constructor(props) {
        super(props);
        /**
         * initial state of clock
         *
         * @type {{currentTime: string,
         * hour: *,
         * currentDay: null,
         * daysArray: *[],
         * minutes: *,
         * caption: string}}
         */
        this.state = {

            hour: new Date().getHours(),
            minutes: new Date().getMinutes(),
            currentDay: null,
            daysArray: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
            caption: "",
            currentTime: ""
        };
    }

    /**
     * Get current local time and sets state accordingly
     */
    getCurrentTime() {
        this.setState({hour: new Date().getHours()});
        this.setState({minutes: new Date().getMinutes()});

        //returns time in human-readable format
        this.setState({currentTime: formatTime(this.state.hour, this.state.minutes, new Date().getSeconds())});

        // assigns day name from array to day number from Date
        // eslint-disable-next-line array-callback-return
        this.state.daysArray.map((item, index) => {
            if (index === new Date().getDay()) {
                this.setState({currentDay: item.toUpperCase()});
            }
        })
    }

    /**
     * set state for appropriate caption
     */
    getCaption() {
        this.setState({caption: new Captions(this.state.hour, this.state.minutes).getCurrentCaption()})
    }

    /**
     * On mounting component sets timer interval to refresh page by 1 second and by that simulate clock ticking
     */
    componentDidMount() {
        this.timer = setInterval(() => {
            this.getCurrentTime();
            this.getCaption()
        },1000)
    }

    /**
     * Before un-mounting timer is cleared
     */
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    /**
     * Renders html for clock
     * @returns {*}
     */
    render() {
        return (
            <div className="clock-container">
                <div className="clock-wrapper">
                    <span className="days-text">{this.state.currentDay}</span>
                    <span className="time-text">{this.state.currentTime}</span>
                    <span className="caption-text">{this.state.caption}</span>
                </div>
            </div>
        );
    }
}
