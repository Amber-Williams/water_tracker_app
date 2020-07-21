const dotenv = require('dotenv');
const fetch = require("node-fetch");
const moment = require('moment');

dotenv.config({ path: './client/.env' });

test('I can create a user', async () => {
  const data = {"username" : "test"}
  const timestamp = new Date().getTime();

  const expected =  {"createdAt": timestamp, "id": "test", "waterEnteries": []}

  let result = await fetch(`${process.env.SERVER_ADDRESS}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  result = await result.json();


  const expected_date = moment(timestamp);
  const result_date = moment(result.createdAt);
  expect(expected_date.isSame(result_date, 'day')).toBe(true)

  result.createdAt = timestamp;
  expect(result).toEqual(expected);
});

test('I can get a user', async () => {
  const username = "test";
  let result = await fetch(`${process.env.SERVER_ADDRESS}/user/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  result = await result.json();

  expect(result.id).toEqual(username);
});

test('I can get a user\'s empty posts from today', async () => {
  const timestamp = new Date().getTime();

  const username = "test";

  let result = await fetch(`${process.env.SERVER_ADDRESS}/post/${username}/${timestamp}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  result = await result.json();

  expect(result).toEqual([]);
});

test('I can post a water level', async () => {
  const username = "test";
  const waterLevel = 350;

  let result = await fetch(`${process.env.SERVER_ADDRESS}/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: username, waterLevel: waterLevel }),
  })

  result = await result.json();

  expect(result[0].level).toEqual(waterLevel);
});


test('I can delete a user', async () => {
  const username = "test";

  let result = await fetch(`${process.env.SERVER_ADDRESS}/user/${username}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  result = await result.json();

  expect(result).toEqual({});
});




