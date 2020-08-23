import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UpdateModal from './../update-modal/update-modal';
import WaterGraphic from './../water-graphic/water-graphic';
import PencilSVG from './../../images/pencil.svg';
import WaterButtons from '../water-buttons/water-buttons';
import { createDateEntry, getDateEntries } from './../../utilities/api.helpers';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize';

const WaterScreen = ({ username }) => {
  const [waterLevel, setWaterLevel] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(null);

  // date picker ///
  const [sdate, setSdate] = useState(moment());
  const [edate, setEdate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    console.log(startDate, endDate)
    setSdate(startDate);
    setEdate(endDate);
  };
  const handleDateChange = (date) => {
    console.log(date)
    setSdate(date);
  };

  // date picker ///

  useEffect(() => {
    async function fetchDateEntries() {
      const waterLevel = await getDateEntries(username);
      setWaterLevel(waterLevel);
    }

    fetchDateEntries();
  }, []);

  const handleUpdateModalSubmit = (event, waterLevel) => {
    event.preventDefault();
    waterLevel = Number(waterLevel);
    createDateEntry(username, waterLevel, setWaterLevel);
    setShowUpdateModal(false);
  };

  return (
    <React.Fragment>
      <div className="WaterScreen">
      {/* See data / edit date */}
      <DateRangePicker
        startDate={sdate}
        endDate={edate}
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)} />

        <SingleDatePicker
          date={sdate} // momentPropTypes.momentObj or null
          onDateChange={handleDateChange} // PropTypes.func.isRequired
          focused={focusedInput} // PropTypes.bool
          onFocusChange={focusedInput => setFocusedInput(focusedInput)}// PropTypes.func.isRequired
        />

        <div className="text-color--secondary text-center">
          <h1> Welcome {username}! </h1>
          <h3>Your water level is currenty</h3>
          <h2>{waterLevel} ml</h2>
        </div>

        <button onClick={() => setShowUpdateModal(true)} className="pencil">
          <img src={PencilSVG} />
        </button>

        <WaterGraphic waterLevel={waterLevel} />
        <WaterButtons
          username={username}
          waterLevel={waterLevel}
          setWaterLevel={setWaterLevel}
        />
      </div>

      {showUpdateModal ? (
        <UpdateModal
          setShowUpdateModal={setShowUpdateModal}
          handleUpdateModalSubmit={handleUpdateModalSubmit}
        />
      ) : null}


    </React.Fragment>
  );
};

WaterScreen.propTypes = {
  username: PropTypes.string,
};

export default WaterScreen;
