import React, {useEffect, useState} from 'react';
import {gapi} from "gapi-script";
import {Paper} from "@material-ui/core";
import './Celebration_style.css'
import {getMonday} from "../utils";
import {Title} from "../Title/Title";


export const Celebration = () => {
    // initial state
    let [students, setStudents] = useState([]);

    /**
     * Asynchronously loads requested library and then
     * calls callback - checking authorisation
     */
    function handleClientLoad() {
        gapi.load('client:auth2', checkAuth)
    }

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
            range: "A1:T"
        }).execute(res => {
            setStudents(res.values)
        });
    }

    /**
     * On mounting - calls calendar api
     */
    useEffect(() => {
        handleClientLoad()
        // eslint-disable-next-line
    }, []);


    return (

        <Paper className={'celebration'} style={{height: 'calc(100vh - 100px)'}}>
            <div className="pyro">
                <div className="before"/>
                <div className="after"/>
                <div style={{color: 'white', textAlign: 'center', fontSize: 20, padding: 30}}>
                    <Title title={"Let's celebrate!"}/>
                    {
                        students.splice(1).map((obj, index) => {
                                let lastMonday = getMonday(new Date());
                                if (new Date(obj[0].toString()) >= lastMonday) {
                                    if(obj[2] === 'PA'){
                                        return (
                                        <p key={index}>{obj[1]} passed {obj[2]} and now is in {obj[3]} module!</p>
                                    )
                                    }else if(obj[2] === 'GO'){
                                        return (
                                        <p key={index}>{obj[1]} was given {obj[2]} status!</p>
                                        )
                                    } else if(obj[2] === 'TRIAL'){
                                        return (
                                        <p key={index}>{obj[1]} passed through {obj[2]}!</p>
                                        )
                                    } else if(obj[2] === 'JOB'){
                                        return (
                                        <p key={index}>{obj[1]} got a {obj[2]}!</p>
                                        )
                                    }
                                }
                            }
                        )
                    }
                </div>
            </div>
        </Paper>
    )
};

