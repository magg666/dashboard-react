import React, {useEffect, useState} from "react";
import dog from './dog.jpg'

/**
 * Functional component displaying data from Nasa Api
 * @returns {*}
 * @constructor
 */
export const NasaImage = () => {

    // Initial state
    let [image, setImage] = useState("");
    let [title, setTitle] = useState("");
    let [type, setType] = useState("");

    // styling
    const styles = {
            container: {
                display: 'flex',
                margin: 5
            },
            wrapper: {
                justifyContent: "center",
                border: '2px solid rgb(200, 200, 200)',
                borderRadius: '10px',
                height: '65vh',
                position: "relative"
            },
            img: {
                height: '100%',
                objectFit: "contain"
            },
            titleImg: {
                position: "absolute",
                top:
                    '8px',
                right:
                    '16px',
                color:
                    "white"
            }
        }
    ;

    /**
     * Fetching data from Nasa Api
     * @returns {Promise<void>}
     */
    async function fetchNasaData() {
        let response = await fetch(process.env.REACT_APP_NASA_URL, {
            method: 'GET',
            mode: "cors",
        });
        response.json()
            .then(res => {
                setImage(res["url"]);
                setTitle(res["title"]);
                setType(res["media_type"])
            })
    }

    /**
     * Equivalent of 'componentDidMount in hooks
     * Second parameter [] prevents rendering non-stop
     */
    useEffect(() => {
        fetchNasaData().catch(err => console.log(err));
    }, []);

    if (type === "image") {
        return (
            <div style={styles.container}>
                <div style={styles.wrapper}>
                    <img alt={"Nasa of day"} style={styles.img}
                         srcSet={image}/>
                    <div className="title" style={styles.titleImg}>{title}</div>
                </div>
            </div>
        )
    }
    // backup image
    else {
        return (
            <div style={styles.container}>
                <div style={styles.wrapper}>
                    <img src={dog} alt={'dog'} style={styles.img}/>
                    <div className="title" style={styles.titleImg}>Awesome dog from Nasa</div>
                </div>
            </div>
        )
    }
};