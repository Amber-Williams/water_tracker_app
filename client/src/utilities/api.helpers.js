export const createDateEntry = (username, date, amount, setWaterLevel) => {
  fetch(`${process.env.SERVER_ADDRESS}/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: username, date: date, waterLevel: amount }),
  })
    .then((response) => response.json())
    .then((data) => {
      const latest_entery = data.pop();
      setWaterLevel(latest_entery.level);
    })
    .catch((error) => {
      console.error('Error:', error); // eslint-disable-line no-console
    });
};

export const getDateEntries = async (date, username) => {
  let waterLevel;

  await fetch(`${process.env.SERVER_ADDRESS}/post/${username}/${date}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length < 1) {
        waterLevel = 0;
      } else {
        waterLevel = data.level;
      }
    })
    .catch((error) => {
      console.error('Error:', error); // eslint-disable-line no-console
    });

  return waterLevel;
};

export const registerUser = (username, setUsername) => {
  const data = { username: username };

  fetch(`${process.env.SERVER_ADDRESS}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(({ id }) => {
      localStorage.setItem('username', id);
      setUsername(id);
    })
    .catch((error) => {
      console.error('Error:', error); // eslint-disable-line no-console
    });
};
