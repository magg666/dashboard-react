import React from "react";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import {NasaImage} from "../NasaImage/NasaImage";
import {NumberFactWidget} from "../NumberFactsWidget/NumberFactsWidget";


export default function InfoPage() {
    return (
        <React.Fragment>
            <div style={{height: '80px'}}> some text</div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <WeatherWidget/>
                <NasaImage/>
            </div>
        </React.Fragment>
    )
}