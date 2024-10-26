import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LinesPage from './pages/LinesPage.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Navigate replace to="/line/red/all-stations" />} />
            <Route path="/line/:color/:station" element={<LinesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
