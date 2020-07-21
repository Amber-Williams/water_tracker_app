import React, { useState, useEffect } from 'react';
import Login from './components/login/login.js';
import WaterScreen from './components/water-screen/water-screen.js';

const App = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setUsername(username);
    }
  }, []);

  if (!username) {
    return <Login setUsername={setUsername} />;
  } else {
    return <WaterScreen username={username} />;
  }
};
export default App;
