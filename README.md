# water_tracker_app

A web application that helps you keep track of how much water you drank per day.

## Setting up the API server

1. At the root folder in your terminal run `npm install` to install the node modules

2. Run `cd server` to go into the server directory then run the below with your AWS key information in your terminal
   `export AWS_ACCESS_KEY_ID=XXXXXXXXXXXXXXX`
   `export AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXXXX`

3. Then make sure you have serverless installed globally and run `serverless deploy` to start the backend server.

   (Incase you run into issues: Use this specific version of serverless and ran `npm i serverless@1.35.1 -g` as I ran into this issue on my MacOS)

4. Following this you should see a host address your server is hosted at. Save this for the front end. It will look like this

   ```
   https://########.execute-api.us-east-1.amazonaws.com/dev
   ```


## Setting up the React app client

1. At the root of the folder run `npm install` to install all the node modules

2. Run `cd client` to go into the client directory then create a `.env` file with the host address you saved above and put it into your `.env` file along with your AWS key credentials. It should look like the following

   ```
   AWS_ACCESS_KEY_ID=XXXXXXXXXXXXXX
   AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXX
   SERVER_ADDRESS=https://########.execute-api.us-east-1.amazonaws.com/dev
   ```

3. You can host and serve by running `serverless deploy` while inside the `client` directory

4. Now head to the url listed in the `bucketUrl` from the response and start tracking your water intake!


## Setting up testing
1. At the root of the folder run `npm install` to install all the node modules

2. Run `npm run test` to run tests


### About the application
App can be viewed [here](http://website-fpe0zhk.s3-website.us-east-1.amazonaws.com/)
This app is made to track daily intakes of water and was built to work with a date selector in mind. The app was created with a client side and server side microservices that are easy to deploy via serverless files.

Testing was created to run on the API endpoint, which is meant to run on a test database *not* the real one.

Nice to haves would be:
* Better testing on the API endpoints and front end testing on components and utility functions. 
* SASS / SCSS / or styled components...overall needs better styling
* Authentication
* Date selector to show historical data
* Better date formatting so a person can look at the database and understand what date/time it is
* Animations
* And more
