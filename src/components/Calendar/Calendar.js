import React, {useEffect, useState} from 'react'
import {gapi} from 'gapi-script';
import {checkIfAllDay, formatShortTime, formatCalendarDate} from "./Calendar_container";
import Table from "react-bootstrap/Table";
import {Paper} from "@material-ui/core";
import {Title} from "../Title/Title";
import './Calendar_style.css'



export const Calendar = (props) => {
    // initial state
    let [eventsList, setEvents] = useState([]);

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
            client_id: props.clientId,
            scope: 'https://www.googleapis.com/auth/calendar',
            immediate: true,
            prompt: 'none'
        }, handleAuthResult)
    }

    /**
     * Indicates what google api will be connected and calls function
     * - callback - with parameters to handling response
     */
    function handleAuthResult() {
        gapi.client.load('calendar', 'v3', makeApiCall)
    }


    /**
     * Function that actually make call to indicated api
     * and set state of component
     */
    function makeApiCall() {
        let today = new Date(); //today date
        gapi.client.calendar.events.list({
            'calendarId': props.calendarId,
            'timeZone': "Europe/Warsaw",
            'singleEvents': true,
            'timeMin': today.toISOString(), //gathers only events not happened yet
            'maxResults': props.amount,
            'orderBy': 'startTime'
        }).execute(res => {
            console.log(res.items);
            setEvents(res['items'])
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
        <Paper style={{height: 'calc(100vh - 100px)'}}>
            <div className="stars">
                <div className={'tableCalendar'}>
                 <Title title={props.title}/>
                    <Table style={{margin: 20}} borderless >
                        {eventsList.map(obj => {
                            if (checkIfAllDay(obj)) {
                                return (
                                    <tr>
                                        <td>{formatCalendarDate(obj.start.date)}</td>
                                        <td>All day</td>
                                        <td>{obj.summary}</td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr>
                                        <td>{formatCalendarDate(obj.start.dateTime)}</td>
                                        <td>{formatShortTime(obj.start.dateTime)} - {formatShortTime(obj.end.dateTime)}</td>
                                        <td>{obj.summary}</td>
                                    </tr>
                                )
                            }
                        })}
                    </Table>
                </div>
            </div>
            <div className="twinkling"/>
            <div className="clouds"/>
        </Paper>
    )
};