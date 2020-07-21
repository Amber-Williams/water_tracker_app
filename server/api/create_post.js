'use strict';
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.waterLevel !== 'number' ) {
    const error = 'Couldn\'t create the water post. Issue with input type.'
    console.error(`Validation Failed: ${error}`);
    callback(null, {
      statusCode: 400,
      headers: { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Credentials': true
      },
      body: error,
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: data.id,
    },
    ExpressionAttributeNames: {
      '#waterEnteries': 'waterEnteries',
    },
    ExpressionAttributeValues: {
      ':waterLevel': [{ 
          date: timestamp, 
          level: data.waterLevel
      }]
    },
    UpdateExpression: 'SET #waterEnteries = list_append(#waterEnteries, :waterLevel)',
    ReturnValues: 'ALL_NEW',
  };


  // update the user item in the database with new water entry
  dynamoDb.update(params, (error, result) => {
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
        body: error,
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: { 
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(result.Attributes.waterEnteries),
    };
    callback(null, response);
  });
};

