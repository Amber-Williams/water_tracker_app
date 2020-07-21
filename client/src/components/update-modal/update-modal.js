import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UpdateModal = ({ setShowUpdateModal, handleUpdateModalSubmit }) => {
  const [input, setInput] = useState('');

  const onInputChange = (event) => {
    setInput(event.target.value);
  };
 
  return (
    <React.Fragment>
      <div className="UpdateModal--background" onClick={() => setShowUpdateModal(false)}></div>
        <div className="UpdateModal p-3 text-color--primary">
          <h2>Update Target Water</h2>
          <p>Please enter your new water target below:</p>

          <form onSubmit={(e) => handleUpdateModalSubmit(e, input)}>
            <div className="form-group p-0">
              <label htmlFor="waterLevel"></label>
              <input type="number" className="form-control" id="waterLevel" aria-describedby="waterLevelHelp" onChange={onInputChange}/>
            </div>
            <button type="submit" className="btn btn-primary w-100">Update</button>
          </form>
        </div>
      </React.Fragment>
  )
}

UpdateModal.propTypes = {
  setShowUpdateModal: PropTypes.function,
  handleUpdateModalSubmit: PropTypes.function
};

export default UpdateModal;
