import React, { useState } from 'react';

const Login = ({ setUsername }) => {
  const [input, setInput] = useState('');

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser(input)
  };

  const registerUser = (username) => {
    const data = { 'username': username };

    fetch(`${process.env.SERVER_ADDRESS}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(({id}) => {
      localStorage.setItem('username', id);
      setUsername(id)
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  };
 
  return (
    <div className="login-container">
      <form className="col-6" onSubmit={handleSubmit}>
        <div className="form-group p-0">
          <label for="username">Username</label>
          <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" onChange={onInputChange}/>
        </div>
        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};

export default Login;
