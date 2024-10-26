import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar({ line, station, stationData, onStationChange }) {
    const currLine = line.toLowerCase();
    const lineObject = stationData.find(item => item.line.toLowerCase() === currLine);
    const lineStations = lineObject ? lineObject.stations : [];

    return (
        <div className={styles.navbar_container}>
            <h2 className={styles.instructions}>Select your starting station.</h2>
            <div className={styles.station_container}>
                <div className={styles.button_container}>
                    <button 
                        className={`${styles.station_button} ${station === 'all-stations' ? styles.active : ''}`}
                        onClick={() => onStationChange('all-stations')}
                    >
                        All Stations
                    </button>
                    {lineStations.length > 0 ? (
                        lineStations.map((stationName) => (
                            <button 
                                key={stationName} 
                                className={`${styles.station_button} ${station === stationName.toLowerCase().replace(/\s+/g, '-') ? styles.active : ''}`}
                                onClick={() => onStationChange(stationName)}
                            >
                                {stationName}
                            </button>
                        ))
                    ) : (
                        <p>No stations available for this line. (Line: {currLine})</p>
                    )}
                </div>
            </div>
        </div>
    );
}
