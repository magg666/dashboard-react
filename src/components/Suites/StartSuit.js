import React, {useState} from "react";
import Carousel from "react-bootstrap/Carousel";
import InfoPage from "../InfoPage/InfoPage";
import {Calendar} from "../Calendar/Calendar";

/**
 * Component groups elements for start of week to display.
 * Renders:
 * 1. Info Page
 * 2. Calendar Info
 *
 * @returns {*}
 * @constructor
 */
export const StartSuit = () => {

    // this are states for carousel
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    /**
     * Handles moving the Carousel
     * @param selectedIndex
     * @param e
     */
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };

    return (
        <Carousel interval={null} activeIndex={index} direction={direction} onSelect={handleSelect}>

            <Carousel.Item>
                <InfoPage/>
            </Carousel.Item>
            <Carousel.Item>
                <Calendar amount={6} clientId={process.env.REACT_APP_GOOGLE_CLIENT}
                          calendarId={process.env.REACT_APP_CALENDAR_STUDENTS} title={"CODECOOL EVENTS"}/>
            </Carousel.Item>
            <Carousel.Item>
                <Calendar amount={10} clientId={process.env.REACT_APP_GOOGLE_CLIENT}
                          calendarId={process.env.REACT_APP_CALENDAR_CONSULTATION} title={"CODECOOL CONSULTATIONS"}/>
            </Carousel.Item>
        </Carousel>
    )
};