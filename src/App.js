import React, {Component} from 'react';
import './App.css';
import {ControlledCarousel} from "./components/Carousel/carousel";
import Clock from "./components/Clock/Clock";

class App extends Component {
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
