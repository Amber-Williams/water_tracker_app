import React from 'react';
import PropTypes from 'prop-types';
import ImagePlus from './../../images/plus.svg';
import ImageMinus from './../../images/minus.svg';
import { createDateEntry } from './../../utilities/api.helpers';

const WaterButtons = ({ username, waterLevel, setWaterLevel }) => {
  const MinusPlusAction = (is_plus = false) => {
    let newWaterLevel = waterLevel;
    const increment = 50;

    if (is_plus) {
      newWaterLevel = newWaterLevel + increment;
    } else if (!is_plus && newWaterLevel > 0) {
      newWaterLevel = newWaterLevel - increment;
      newWaterLevel < 0 ? (newWaterLevel = 0) : null;
    }

    createDateEntry(username, newWaterLevel, setWaterLevel);
  };

  return (
    <React.Fragment>
      <div className="WaterButtons w-100 d-flex justify-content-around">
        <button
          className="h2"
          onClick={() => createDateEntry(username, 150, setWaterLevel)}
        >
          150 ml
        </button>
        <button
          className="h2"
          onClick={() => createDateEntry(username, 250, setWaterLevel)}
        >
          250 ml
        </button>
        <button
          className="h2"
          onClick={() => createDateEntry(username, 350, setWaterLevel)}
        >
          350 ml
        </button>
      </div>

      <div className="WaterButtons--MinusPlus d-flex justify-content-around">
        <img src={ImageMinus} onClick={() => MinusPlusAction()} />
        <img src={ImagePlus} onClick={() => MinusPlusAction(true)} />
      </div>
    </React.Fragment>
  );
};

WaterButtons.propTypes = {
  username: PropTypes.string,
  waterLevel: PropTypes.number,
  setWaterLevel: PropTypes.func.isRequired,
};

export default WaterButtons;
