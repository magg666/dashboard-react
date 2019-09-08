import React, {useEffect, useState} from "react";
import InfoPage from "../InfoPage/InfoPage";
import Carousel from "react-bootstrap/Carousel";
import ColumnBar from "../ColumnBar/ColumnBar";
import {Celebration} from "../CelebrationScreen/Celebration";
import {useInterval} from "../utils";


/**
 * Component groups elements for end of week to display.
 * Renders:
 * 1. Info Page
 * 2. Total Github Statistic
 * 3. Celebration screen
 *
 * @returns {*}
 * @constructor
 */
export const FinishSuit = () => {

    // this is hook for processed gitHub data
    let [githubTotalData, setData] = useState([]);

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
    async function getGithubTotalData() {
        let response = await fetch('http://127.0.0.1:8000/repository/total/', {
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
        getGithubTotalData().catch(err => console.log(err))
    }, []);

    useInterval(() => {
        getGithubTotalData().catch(err => console.log(err))
    }, 60000);


    function getStats(array, statsType) {
        let projectsStats = [];
        array.projects.map(pr => {
            return pr['total'].map(stat => {
                return projectsStats.push(stat[statsType])
            })
        });
        return projectsStats
    }

    return (
        <Carousel interval={null} activeIndex={index} direction={direction} onSelect={handleSelect} indicators={false}
                  fade={true} pauseOnHover={false}>
            {
                githubTotalData.map((obj, bIndex) => {
                    if (obj['projects'].length !== 0) {

                        // get list of projects titles
                        let projectsTitles = [];
                        obj.projects.map(pr => {
                            return projectsTitles.push(pr['project'])
                        });

                        let commits = getStats(obj, 'commits');
                        let additions = getStats(obj, 'additions');
                        let deletions = getStats(obj, 'deletions');


                        return (
                            <Carousel.Item key={bIndex}>
                                <ColumnBar key={bIndex * 5} projectsTitles={projectsTitles} commits={commits}
                                           additions={additions} deletions={deletions} title={obj.module}/>
                            </Carousel.Item>
                        )

                    }
                    return null
                })
            }
            <Carousel.Item>
                <InfoPage/>
            </Carousel.Item>
            <Carousel.Item>
                <Celebration/>
            </Carousel.Item>
        </Carousel>
    )
};