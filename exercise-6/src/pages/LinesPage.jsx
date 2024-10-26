import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import TrainList from '../components/TrainList';
import axios from "axios";

import styles from "./LinesPage.module.css";

const fetchStationData = async () => await axios.get("http://localhost:3000/api/stations");
const fetchTrainData = async () => await axios.get("http://localhost:3000/api/trains");

const getLineOrientation = (lineColor) => {
  switch (lineColor.toLowerCase()) {
    case 'red':
    case 'gold':
      return ['North', 'South'];
    case 'blue':
    case 'green':
      return ['East', 'West'];
    default:
      return ['North', 'South'];
  }
};

export default function LinesPage() {
  const { color, station } = useParams();
  const navigate = useNavigate();
  const [stationData, setStationData] = useState([]);
  const [trainData, setTrainData] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState('all');
  const [arrivalFilter, setArrivalFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const stations = await fetchStationData();
      const trains = await fetchTrainData();
      setStationData(stations.data);
      setTrainData(trains.data);
    };
    fetchData();
  }, []);

  const handleColorChange = (newColor) => {
    navigate(`/line/${newColor.toLowerCase()}/all-stations`);
  };

  const handleStationChange = (newStation) => {
    if (newStation === 'All Stations') {
      navigate(`/line/${color}/all-stations`);
    } else {
      const formattedStation = newStation
        .split('/')[0]
        .trim()
        .replace(/\s+station$/i, '')
        .toLowerCase()
        .replace(/\s+/g, '-');
      navigate(`/line/${color}/${formattedStation}`);
    }
  };

  const lineOrientation = getLineOrientation(color);

  return (
    <div className={styles.page_container}>
      <div className={styles.color_buttons}>
        {['gold', 'red', 'blue', 'green'].map((lineColor) => (
          <button 
            key={lineColor} 
            onClick={() => handleColorChange(lineColor)}
            className={`${styles.color_button} ${styles[lineColor]}`}
          >
            {lineColor.charAt(0).toUpperCase() + lineColor.slice(1)}
          </button>
        ))}
      </div>
      <div className={styles.title_container}>
        <h1>{color.toUpperCase()}</h1>
      </div>
      <div className={styles.lines_page_container}>
        <div className={styles.navbar_column}>
          <NavBar 
            line={color} 
            station={station} 
            stationData={stationData} 
            onStationChange={handleStationChange}
          />
        </div>
        <div className={styles.train_list_column}> 
          <div className={styles.options_container}>
            <button 
              className={`${styles.option_button} ${arrivalFilter === 'arriving' ? styles.active : ''}`}
              onClick={() => setArrivalFilter(arrivalFilter === 'arriving' ? 'all' : 'arriving')}
            >
              Arriving
            </button>
            <button 
              className={`${styles.option_button} ${arrivalFilter === 'scheduled' ? styles.active : ''}`}
              onClick={() => setArrivalFilter(arrivalFilter === 'scheduled' ? 'all' : 'scheduled')}
            >
              Scheduled
            </button>
            <button 
              className={`${styles.option_button} ${selectedDirection === lineOrientation[0] ? styles.active : ''}`}
              onClick={() => setSelectedDirection(selectedDirection === lineOrientation[0] ? 'all' : lineOrientation[0])}
            >
              {lineOrientation[0]}bound
            </button>
            <button 
              className={`${styles.option_button} ${selectedDirection === lineOrientation[1] ? styles.active : ''}`}
              onClick={() => setSelectedDirection(selectedDirection === lineOrientation[1] ? 'all' : lineOrientation[1])}
            >
              {lineOrientation[1]}bound
            </button>
          </div>
          <div className={styles.train_list_wrapper}>
            <TrainList 
              line={color} 
              station={station} 
              trainData={trainData} 
              direction={selectedDirection}
              arrivalFilter={arrivalFilter}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
