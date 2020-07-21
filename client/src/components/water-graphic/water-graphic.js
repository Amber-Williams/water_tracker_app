import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ManDrinking from './../../images/man-drinking.png';

const WaterGraphic = ({ waterLevel }) => {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const goal = 350; //ml
    const waterManHeight = document.getElementById('water-man').getBoundingClientRect().height;
    let percentage = waterLevel / goal;
    if (percentage > 1 ) {
      percentage = 1;
    }

    const height = Math.round( percentage * waterManHeight);
    setHeight(height);
  }, [waterLevel]);
 
  return (
    <div className="WaterGraphic">
      <div id="water" style={{
        height: `${height}px`,
        marginTop: `-${height}px`
      }}></div>
      <img id="water-man" src={ManDrinking}/>
    </div>
  )
};

WaterGraphic.propTypes = {
  waterLevel: PropTypes.number,
};

export default WaterGraphic;
