import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UpdateModal from './../update-modal/update-modal';
import WaterGraphic from './../water-graphic/water-graphic';
import PencilSVG from './../../images/pencil.svg';
import WaterButtons from './../water-buttons/water-buttons';
import { createDateEntry, getDateEntries } from './../../utilities/api.helpers';
import DatePicker from './../date-picker/date-picker'
import moment from 'moment';

const WaterScreen = ({ username }) => {
  const [waterLevel, setWaterLevel] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(null);
  const [startDate, setStartDate] = useState(moment());

  useEffect(() => {
    fetchDateEntries(startDate);
  }, []);

  const fetchDateEntries = async (date) => {
    const waterLevel = await getDateEntries(moment(date).valueOf(), username);
    setWaterLevel(waterLevel);
  }
  const handleUpdateModalSubmit = (event, waterLevel) => {
    event.preventDefault();
    waterLevel = Number(waterLevel);
    createDateEntry(username, moment(startDate).valueOf(), waterLevel, setWaterLevel);
    setShowUpdateModal(false);
  };

  return (
    <React.Fragment>
      <div className="WaterScreen">
        <DatePicker startDate={startDate} setStartDate={setStartDate} fetchDateEntries={fetchDateEntries}/>

        <div className="text-color--secondary text-center">
          <h1> Welcome {username}! </h1>
          {moment(startDate).isSame(moment(), 'day')
            ? <h3>Your water level is currenty</h3>
            : <h3>{moment(startDate).format('DD-MM-YYYY')} - your water level was</h3>
          }
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
          startDate={startDate}
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
