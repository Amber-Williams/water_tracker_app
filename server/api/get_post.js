'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const moment = require('moment');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  // fetch user's water level post from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 
          'Content-Type': 'text/plain', 
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({'error': 'Couldn\'t fetch the user\'s water level post.'}),
      });
      return;
    }

    // TTD move to utlities folder & test
    let response;

    let dated_post = result.Item.waterEnteries.filter(entry => {
      const date = Number(event.pathParameters.date);
      const entry_date = moment(entry.date);
      return entry_date.isSame(date, 'day');
    })

    if (dated_post.length > 1) {
      dated_post = dated_post.sort((a,b) => {
        return b.date - a.date;
      })
      dated_post = dated_post[0];
    }

    response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(dated_post),
    };

    // create a response
    callback(null, response);
  });
};
