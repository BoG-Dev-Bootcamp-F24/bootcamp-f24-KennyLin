import React from "react";
import Train from "./Train";

export default function TrainList({ color, data }) {
    const filteredTrains = data.filter(train => train.LINE.toLowerCase() === color.toLowerCase());

    return (
        <div className="trainList">
            {filteredTrains.map((trainObject) => (
                <Train key={trainObject._id} trainData={trainObject} />
            ))}
        </div>
    );
}