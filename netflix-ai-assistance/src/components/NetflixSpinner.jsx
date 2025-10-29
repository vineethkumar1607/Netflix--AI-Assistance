// src/components/NetflixSpinner.jsx

import "./NetflixSpinner.css";

const NetflixSpinner = () => {
  return (
    // CHANGE h-screen to h-full. The w-full is implied by flex.
    <div className="flex justify-center items-center h-full"> 
      <div className="netflix-spinner"></div>
    </div>
  );
};

export default NetflixSpinner;