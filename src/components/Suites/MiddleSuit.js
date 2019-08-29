import React, {useEffect, useState} from "react";
import InfoPage from "../InfoPage/InfoPage";
import Carousel from "react-bootstrap/Carousel";
import {StackedBars} from "../StackBar/StackedBars";
import {Paper} from "@material-ui/core";
import {Title} from "../Title/Title";

/**
 * Component groups elements for middle of week to display.
 * Renders:
 * 1. GitHub Weekly Statistic
 * 2. Info Page
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
    });

    return (
        <Carousel interval={null} activeIndex={index} direction={direction} onSelect={handleSelect}>
            {
                githubWeekData.map((obj, bIndex) => {
                    return (
                        <Carousel.Item key={bIndex}>
                            <Paper style={{height: 'calc(100vh - 100px)'}}>
                                <Title key={obj.module} title={obj.module}/>
                                <StackedBars key={bIndex * 5} data={obj.projects}/>
                            </Paper>
                        </Carousel.Item>
                    )
                })
            }
            <Carousel.Item>
                <InfoPage/>
            </Carousel.Item>
        </Carousel>
    )
};


