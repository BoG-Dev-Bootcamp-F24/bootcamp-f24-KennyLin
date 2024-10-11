import React from "react";
// Import train.css

export default function Train({ trainData }) {

    const {
        DESTINATION,
        HEAD_SIGN,
        LINE,
        WAITING_TIME,
        DELAY,
    } = trainData;

    const [lineColor, lineName] = getLineColor(LINE);

    const stationLetter = HEAD_SIGN.charAt(0);
    const onTime = DELAY === "T0S"; 
    const destStation = fixCapitalization(DESTINATION) + " Station";
    const currStation = fixCapitalization(HEAD_SIGN) + " Station";
    const [waitNum, waitUnit] = WAITING_TIME.split(" ");

    return (
        <div className="trainContainer">
            <div className="stationLetter">
                <span>{stationLetter}</span>
            </div>
            <div className="trainInfo">
                <div className="routeRow">
                    <span>{currStation}</span>
                    <span className="arrow">→</span>
                    <span>{destStation}</span>
                </div>
                <div className="lineRow">
                    <div className="lineContainer" style={{ backgroundColor: lineColor }}>
                        <span>{lineName}</span>
                    </div>
                    <span>{onTime ? "On time" : "Delayed"}</span>
                </div>
            </div>
            <div className="timeToStation">
                <div className="timeRow">
                    <span>{waitNum}</span>
                </div>
                <div className="unitRow">
                    <span>{waitUnit}</span>
                </div>
            </div>
        </div>
    );
}

/**
 * Takes in a fully capitalized name and fixes capitalization so it's suitable for display and adds "Station" to the end of the name
 * @param {String} name 
 * @returns 
 */
function fixStationName( name ) {
    if (!name) return '';
    name = name.toLowerCase();
    words = name.split(" ")
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
}

/**
 * Returns the color and name of the line   
 * @param {String} line 
 * @returns {Array} [color, name]
 */
function getLineColor( line ) {
    const lineColors = {
        "RED": ("#FF0000", "Red"),
        "BLUE": ("#0000FF", "Blue"),
        "GREEN": ("#00FF00", "Green"),
        "GOLD": ("#FFD700", "Gold"),
    }
    return lineColors[line];
}