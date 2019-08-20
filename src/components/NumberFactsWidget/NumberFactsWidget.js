import React, {useEffect, useState} from "react";


export const NumberFactWidget = () => {
    let [number, setNumber] = useState("");


    async function fetchNumberFact() {
        let response = await fetch('http://numbersapi.com/random/trivia');
        response.text()
            .then(res => setNumber(res))
    }
    useEffect(() => {
        fetchNumberFact().catch(err => console.log(err))
        let arr = number.split(" ", 1)


    }, []);

    return (
        <div>
            <span>{}</span>
            <p> UUUU
            </p>
            <span>{number}</span>
        </div>
    )
};