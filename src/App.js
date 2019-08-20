import React, {Component} from 'react';
import './App.css';
import {ControlledCarousel} from "./components/Carousel/carousel";
import Clock from "./components/Clock/Clock";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <ControlledCarousel/>
                </div>
                <div>
                    <Clock/>
                </div>
            </React.Fragment>
        )
    }
}

export default App;
