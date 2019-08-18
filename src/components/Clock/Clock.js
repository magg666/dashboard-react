// https://tutorialscapital.com/react-native-create-live-digital-clock-using-local-system-time-android-ios-tutorial/
import React, {Component} from "react";
import {formatTime} from "./Clock_container";
import './Clock_style.css'
import {Captions} from "./Clock_container";

export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hour: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds(),
            currentDay: null,
            daysArray: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
            caption: "",
            currentTime: ""
        };

    }

    getCurrentTime() {
        this.setState({hour: new Date().getHours()});
        this.setState({minutes: new Date().getMinutes()});
        this.setState({seconds: new Date().getSeconds()});
        this.setState({currentTime: formatTime(this.state.hour, this.state.minutes, this.state.seconds)});
        // eslint-disable-next-line array-callback-return
        this.state.daysArray.map((item, index) => {
            if (index === new Date().getDay()) {
                this.setState({currentDay: item.toUpperCase()});
            }
        })
    }

    getCaption() {
        this.setState({caption: new Captions(this.state.hour, this.state.minutes).getCurrentCaption()})
    }


    componentDidMount() {
        this.timer = setInterval(() => {
            this.getCurrentTime();
            this.getCaption()
        },1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

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
