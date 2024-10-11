import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import TrainList from '../components/TrainList';
import axios from "axios";

// fetch data from MongoDB Atlas
const fetchStationData = async () => await axios.get("http://localhost:5000/api/stations");
const fetchTrainData = async () => await axios.get("http://localhost:5000/api/trains");

export default function LinesPage() {
  const [currColor, setCurrColor] = useState("red");
  const [stationData, setStationData] = useState([]);
  const [trainData, setTrainData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const stations = await fetchStationData();
      const trains = await fetchTrainData();
      setStationData(stations.data);
      setTrainData(trains.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* YOUR JSX CODE */}
      <NavBar color={currColor} data={stationData} />
      <TrainList color={currColor} data={trainData} />
      {/* YOUR JSX CODE */}
    </div>
  );
}