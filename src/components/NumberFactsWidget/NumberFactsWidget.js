import React, {useEffect, useState} from "react";

/**
 * Component to display random, interesting facts about numbers
 * @returns {*}
 * @constructor
 */
export const NumberFactWidget = () => {
    // initial state
    let [number, setNumber] = useState("");

    /**
     * Fetches data from api about numbers.
     * @returns {Promise<void>}
     */
    async function fetchNumberFact() {
        let response = await fetch('http://numbersapi.com/random/trivia');
        response.text()
            .then(res => setNumber(res))
    }

    /**
     * On mounting fetches data and handle errors
     */
    useEffect(() => {
        fetchNumberFact()
            .catch(err => console.log(err));
    }, []);

    /**
     * Render component
     */
    return (
        <div className="row" style={{textAlign: "center", height: '5vh', justifyContent: "center"}}>
            <span style={{color: "#e59400", padding: 20}}>{number}</span>
        </div>
    )
};