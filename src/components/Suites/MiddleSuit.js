import React, {useEffect, useState} from "react";
import InfoPage from "../InfoPage/InfoPage";
import Carousel from "react-bootstrap/Carousel";
import {StackedBars} from "../StackBar/StackedBars";
import {Paper} from "@material-ui/core";
import {Title} from "../Title/Title";
import {Calendar} from "../Calendar/Calendar";
import {useInterval} from "../utils";

/**
 * Component groups elements for middle of week to display.
 * Renders:
 * 1. GitHub Weekly Statistic
 * 2. Info Page
 * 3. Calendar Info
 *
 * @returns {*}
 * @constructor
 */
export const MiddleSuit = () => {

    // this is hook for processed gitHub data
    let [githubWeekData, setData] = useState([]);

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

    /**
     * Fetch data about projects and set state
     * @returns {Promise<void>}
     */
    async function getGithubWeeklyData() {
        let response = await fetch('http://127.0.0.1:8000/repository/week/', {
            method: 'GET'
        });
        response.json()
            .then(res => {
                setData(res)
            })
    }

    /**
     * On mounting fetches data
     */
    useEffect(() => {
        getGithubWeeklyData().catch(err => console.log(err))
    }, []);

    /**
     * Refresh data every minute
     */
    useInterval(() => {
        getGithubWeeklyData().catch(err => console.log(err))
    }, 60000);

    return (
        <Carousel interval={null} activeIndex={index} direction={direction} onSelect={handleSelect} indicators={false}
                  fade={true} pauseOnHover={false}>
            {
                githubWeekData.map((obj, bIndex) => {
                    return obj.projects.length > 0 ?
                        (
                            <Carousel.Item key={bIndex}>
                                <Paper className={'main-screen'}>
                                    <Title key={obj.module} title={obj.module}/>
                                    <StackedBars key={bIndex * 5} data={obj.projects}/>
                                </Paper>
                            </Carousel.Item>
                        ) : null
                })
            }
            <Carousel.Item>
                <InfoPage/>
            </Carousel.Item>
            <Carousel.Item>
                <Calendar amount={6} clientId={process.env.REACT_APP_GOOGLE_CLIENT}
                          calendarId={process.env.REACT_APP_CALENDAR_STUDENTS} title={"CODECOOL EVENTS"}
                          stars={'stars2'} twinkling={'twinkling2'} clouds={'clouds2'}/>
            </Carousel.Item>
            <Carousel.Item>
                <Calendar amount={10} clientId={process.env.REACT_APP_GOOGLE_CLIENT}
                          calendarId={process.env.REACT_APP_CALENDAR_CONSULTATION} title={"CODECOOL CONSULTATIONS"}
                          stars={'stars'} twinkling={'twinkling'} clouds={'clouds'}
                          additional={"Check slots for consultations and ruthlessly use your favourite mentor!"}/>
            </Carousel.Item>
        </Carousel>
    )
};


