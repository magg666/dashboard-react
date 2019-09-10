import React, {useEffect, useState} from 'react'
import {gapi} from 'gapi-script';
import {checkIfAllDay, countDays} from "./Calendar_container";
import Table from "react-bootstrap/Table";
import {Paper} from "@material-ui/core";
import {Title} from "../Title/Title";
import './Calendar_style.css'
import {useInterval, formatShortTime, formatCalendarDate} from "../utils";


/**
 * Component Calendar to get data from Google Calendar and display it.
 * @param props:
 * @returns {*}
 * @constructor
 */
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


    /**
     * Re-renders every 5 minutes
     */
    useInterval(() => {
        handleClientLoad()
    }, 300000);


    return (
        <Paper className={'main-screen'}>
            <div className={props.stars}>
                <div className={'tableCalendar'}>
                    <Title title={props.title}/>
                    <Table style={{margin: 20}} borderless>
                        <tbody>
                        {eventsList.map((event, index) => {
                            if (checkIfAllDay(event)) {
                                return (
                                    <tr key={index}>
                                        <td>{formatCalendarDate(event.start.date)}</td>
                                        <td>{countDays(event.start.date)}</td>
                                        <td>All day</td>
                                        <td style={{width: '40%'}}>{event.summary}</td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={index}>
                                        <td>{formatCalendarDate(event.start.dateTime)}</td>
                                        <td>{countDays(event.start.dateTime)}</td>
                                        <td>{formatShortTime(event.start.dateTime)} - {formatShortTime(event.end.dateTime)}</td>
                                        <td style={{width: '40%'}}>{event.summary}</td>
                                    </tr>
                                )
                            }
                        })}
                        </tbody>
                    </Table>
                    {props.additional ? <div style={{textAlign: 'center'}}><p>{props.additional}</p></div> : null}
                </div>
            </div>
            <div className={props.twinkling}/>
            <div className={props.clouds}/>
        </Paper>
    )
};