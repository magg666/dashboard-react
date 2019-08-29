import React, {Component} from 'react';
import './App.css';
import Clock from "./components/Clock/Clock";
import {MiddleSuit} from "./components/Suites/MiddleSuit";
import BarChart from "./components/ColumnBar/ColumnBar";

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

        if (day === 2) {
            return (
                <BarChart/>
            )
        } else if (day === 3) {
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
