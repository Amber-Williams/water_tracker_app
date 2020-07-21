import React, { useState, useEffect } from 'react';
import UpdateModal from './../update-modal/update-modal';
import WaterGraphic from './../water-graphic/water-graphic';
import PencilSVG from './../../images/pencil.svg';
import WaterButtons from '../water-buttons/water-buttons';
import { createDateEntry, getDateEntries } from './../../utilities/api.helpers'

const WaterScreen = ({ username }) => {
  const [waterLevel, setWaterLevel ] = useState(null);
  const [showUpdateModal, setShowUpdateModal ] = useState(null);

  useEffect(() => {
    async function fetchDateEntries() {
      const waterLevel = await getDateEntries(username);
      setWaterLevel(waterLevel);
    };
    fetchDateEntries();
  }, []);

  const handleUpdateModalSubmit = (event, waterLevel) => {
    event.preventDefault();
    waterLevel = Number(waterLevel);
    createDateEntry(username, waterLevel, setWaterLevel);
    setShowUpdateModal(false);
  }

  return (
    <React.Fragment>
      <div className="WaterScreen">
        <div className="text-color--secondary text-center">
          <h1> Welcome {username}! </h1>
          <h3>Your water level is currenty</h3>
          <h1>{waterLevel} ml</h1> 
        </div>

        <button onClick={() => setShowUpdateModal(true)} className="pencil">
          <img src={PencilSVG} />
        </button>

        <WaterGraphic waterLevel={waterLevel} />
        <WaterButtons username={username} 
                      waterLevel={waterLevel} 
                      setWaterLevel={setWaterLevel}/>
      </div>

      {showUpdateModal 
        ? <UpdateModal setShowUpdateModal={setShowUpdateModal}
                        handleUpdateModalSubmit={handleUpdateModalSubmit}/> 
        : null}
    </React.Fragment>
  )
}
export default WaterScreen;