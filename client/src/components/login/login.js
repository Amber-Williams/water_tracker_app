import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { registerUser } from './../../utilities/api.helpers';

const Login = ({ setUsername }) => {
  const [input, setInput] = useState('');

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser(input, setUsername);
  };

  return (
    <div className="login-container">
      <form className="col-6" onSubmit={handleSubmit}>
        <div className="form-group p-0">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="usernameHelp"
            onChange={onInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setUsername: PropTypes.func.isRequired,
};

export default Login;
