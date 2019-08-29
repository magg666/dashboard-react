import React from "react";

/**
 * Simple title component
 * @param props
 * @returns {*}
 * @constructor
 */
export function Title(props) {
    let style = {
        'text': {
            width: "100%",
            fontSize: '1.4em',
            textAlign: 'center',
            fontWeight: 'bolder',
            paddingHorizontal: 10,
        }
    };
    return (
        <div style={style.text}>{props.title}</div>
    )
}