import React from "react";
import Train from "./Train";
import styles from "./TrainList.module.css";

export default function TrainList({ line, station, trainData, direction, arrivalFilter }) {
    const filteredTrains = trainData.filter(train => {
        const lineMatch = train.LINE.toLowerCase() === line.toLowerCase();
        const stationMatch = station === 'all-stations' || 
                             train.STATION.toLowerCase().startsWith(station.replace(/-/g, ' '));
        const directionMatch = direction === 'all' || 
                               (direction === 'North' && train.DIRECTION === 'N') ||
                               (direction === 'South' && train.DIRECTION === 'S') ||
                               (direction === 'East' && train.DIRECTION === 'E') ||
                               (direction === 'West' && train.DIRECTION === 'W');
        const arrivalMatch = arrivalFilter === 'all' ||
                             (arrivalFilter === 'arriving' && train.WAITING_TIME === "Arriving") ||
                             (arrivalFilter === 'scheduled' && train.WAITING_TIME !== "Arriving");
        return lineMatch && stationMatch && directionMatch && arrivalMatch;
    });

    return (
        <div className={styles.trainList}>
            {filteredTrains.map((trainObject) => (
                <Train key={trainObject._id} trainData={trainObject} />
            ))}
        </div>
    );
}
