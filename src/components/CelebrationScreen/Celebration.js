import React, {useEffect, useState} from 'react';
import {gapi} from "gapi-script";
import {Paper} from "@material-ui/core";
import './Celebration_style.css'
import {getMonday} from "../utils";
import {Title} from "../Title/Title";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrophy, faThumbsUp, faMedal, faAward} from '@fortawesome/free-solid-svg-icons'

/**
 * Component to read and display data from codecool google spreadsheet with data about passed exams
 * @returns {*}
 * @constructor
 */
export const Celebration = () => {
    // initial state
    let [students, setStudents] = useState([]);

    /**
     * Asynchronously loads requested library and then
     * calls callback - checking authorisation
     */
    const handleClientLoad = () => {
        gapi.load('client:auth2', checkAuth)
    };

    /**
     * Checks authorisation parameters, calls callback function on response
     * as response is passed auth. token and some google data about client
     */
    function checkAuth() {
        gapi.auth2.authorize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT,
            scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
            immediate: true,
            prompt: 'none'
        }, handleAuthResult)
    }

    /**
     * Indicates what google api will be connected and calls function
     * - callback - with parameters to handling response
     */
    function handleAuthResult() {
        gapi.client.load('sheets', 'v4', makeApiCall)
    }

    /**
     * Function that actually make call to indicated api
     * and set state of component
     */
    function makeApiCall() {
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: process.env.REACT_APP_SHEET_ID,
            range: "A:D"
        }).execute(res => {
            setStudents(res['values'])
        });
    }

    /**
     * On mounting - calls calendar api
     * Re-renders if students length changes
     */
    useEffect(() => {
        handleClientLoad()
        // eslint-disable-next-line
    }, [students.length]);


    /**
     * Returns specific captions depends of kind exam student passed from last Monday
     * @type {Function}
     */
    let celebrationOptions = ((studentData, index) => {
        let lastMonday = getMonday(new Date());
        let date = studentData[0];
        let person = studentData[1];
        let exam = studentData[2];
        let module = studentData[3];
        if (new Date(date.toString()) >= lastMonday) {
            if (exam === 'PA') {
                return (
                    <p key={index}><FontAwesomeIcon icon={faAward}
                                                    style={{color: 'yellow'}}/> {person} passed {exam} and now is
                        in {module} module!</p>
                )
            } else if (exam === 'GO') {
                return (
                    <p key={index}><FontAwesomeIcon icon={faTrophy}
                                                    style={{color: 'lightgreen'}}/> {person} was given {exam} status!
                    </p>
                )
            } else if (exam === 'TRIAL') {
                return (
                    <p key={index}><FontAwesomeIcon icon={faMedal}
                                                    style={{color: 'red'}}/> {person} passed through {exam}!</p>
                )
            } else {
                return (
                    <p key={index}><FontAwesomeIcon icon={faThumbsUp}
                                                    style={{color: 'blue'}}/> {person} got a {exam}!</p>
                )
            }
        } else {
            return null
        }
    });

    /**
     * Renders students celebration screen.
     */
    if (students.length > 0) {
        return (
            <Paper className={'main-screen'} style={{backgroundColor: "black"}}>
                <div className="pyro">
                    <div className="before"/>
                    <div className="after"/>
                    <div style={{color: 'white', textAlign: 'center', fontSize: '3vh'}}>
                        <Title title={"LET'S CELEBRATE!"}/>
                    </div>
                    <div style={{textAlign: 'center', marginTop: 20}}>
                        {
                            students.splice(1).map((obj, index) => {
                                    return celebrationOptions(obj, index)
                                }
                            )
                        }
                    </div>
                </div>
            </Paper>
        )
    } else {
        return (
            <Paper className={'main-screen'} style={{backgroundColor: "black"}}>
                <div className="pyro">
                    <div className="before"/>
                    <div className="after"/>
                    <div style={{color: 'white', textAlign: 'center', fontSize: '3vh'}}>
                        <Title title={"You are awesome!"}/>
                        <p>If you can't celebrate your success, appreciate your failure. </p>
                        <p>Since life is all about celebration and appreciation.</p>
                    </div>
                </div>
            </Paper>
        )
    }

};

