import React, {Component} from 'react';
import './App.css';
import Clock from "./components/Clock/Clock";
import {MiddleSuit} from "./components/Suites/MiddleSuit";
import {FinishSuit} from "./components/Suites/FinishSuit";


/**
 * Main app
 */
class App extends Component {
    /**
     * Renders theme suites accordingly to day
     * @returns {*}
     */
    render() {
        // today day
        let day = new Date().getDay();

        if (day === 5) {
            return (
                <React.Fragment>
                    <FinishSuit/>
                    <Clock/>
                </React.Fragment>
            )
        } else if (day === 2) {
            return <div>it is Friday</div>
        } else {
            return (
                <React.Fragment>
                    <MiddleSuit/>
                    <Clock/>
                </React.Fragment>
            )
        }
    }
}

export default App;
