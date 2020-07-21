

export const createDateEntry = (username, amount, setWaterLevel) => {
  fetch(`${process.env.SERVER_ADDRESS}/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"id": username, "waterLevel": amount })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const latest_entery = data.pop();
    setWaterLevel(latest_entery.level);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

export const getDateEntries = async (username) => {
  const date = new Date();
  const now = date.getTime();
  let waterLevel;

  await fetch(`${process.env.SERVER_ADDRESS}/post/${username}/${now}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then((data) => {
    if (data.length < 1) {
      waterLevel =  0;
    } else {
      waterLevel = data.level;
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  return waterLevel;
};