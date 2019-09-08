import React from "react";
import './InfoPage_style.css'
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import {NasaImage} from "../NasaImage/NasaImage";
import {NumberFactWidget} from "../NumberFactsWidget/NumberFactsWidget";
import {Paper} from "@material-ui/core";


export default function InfoPage() {
    /**
     * Groups all additional items for page and renders them
     */
    return (
        <Paper className={'main-screen'} style={{backgroundColor: "black"}}>
            <NumberFactWidget/>
            <div className={'infoContainer'}>
                <WeatherWidget/>
                <NasaImage/>
            </div>
        </Paper>
    )
}