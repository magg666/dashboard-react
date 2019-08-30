import React, {useEffect, useState} from "react";
import InfoPage from "../InfoPage/InfoPage";
import Carousel from "react-bootstrap/Carousel";
import {Paper} from "@material-ui/core";
import {Title} from "../Title/Title";
import ColumnBar from "../ColumnBar/ColumnBar";


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
        <Carousel interval={null} activeIndex={index} direction={direction} onSelect={handleSelect}>
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
                                <Paper style={{height: 'calc(100vh - 100px)'}}>
                                    <Title key={obj.module} title={obj.module}/>
                                    <ColumnBar key={bIndex * 5} projectsTitles={projectsTitles} commits={commits}
                                               additions={additions} deletions={deletions}/>
                                </Paper>
                            </Carousel.Item>
                        )

                    } else {
                        return (
                            <Carousel.Item key={bIndex}>
                                <Paper style={{height: 'calc(100vh - 100px)'}}>
                                    <Title key={obj.module} title={obj.module}/>
                                    <div>No projects</div>
                                </Paper>
                            </Carousel.Item>
                        )
                    }
                })
            }
            <Carousel.Item>
                <InfoPage/>
            </Carousel.Item>
        </Carousel>
    )
};