import React, {Component} from 'react';
import './App.css';
import {ControlledCarousel} from "./components/carousel";
import Clock from "./components/Clock/Clock";

class App extends Component {
    state = {
        githubData: []
    };

    render() {
        return (

            <div>
                <ControlledCarousel/>
                <Clock/>
            </div>
        )
    }

}

export default App;
