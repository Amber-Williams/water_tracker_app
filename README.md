# water_tracker_app

A web application that helps you keep track of how much water you drank per day.

## Setting up the API server

1. At the root folder in your terminal run `npm intall` then run `cd server`

2. Then run the below with your AWS key information in your terminal
   `export AWS_ACCESS_KEY_ID=XXXXXXXXXXXXXXX`
   `export AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXXXX`

3. Then make sure you have serverless installed globally and run `serverless deploy` to start the backend server.

   (Incase you run into issues: Use this specific version of serverless and ran `npm i serverless@1.35.1 -g` as I ran into this issue on my MacOS)

4. Following this you should see a host address your server is hosted at. Save this for the front end. It will look like this

   ```
   https://########.execute-api.us-east-1.amazonaws.com/dev
   ```

## Setting up the React app client

1. At the root of the folder run `npm install` to install all the node modules then run `cd client`

2. Then create a `.env` file with the host address you saved above and put it into your `.env` file along with your AWS key credentials. It should look like the following

   ```
   AWS_ACCESS_KEY_ID=XXXXXXXXXXXXXX
   AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXX
   SERVER_ADDRESS=https://########.execute-api.us-east-1.amazonaws.com/dev
   ```

3. You can host and serve by running `serverless deploy`

4. Now head to the url listed in the `bucketUrl` from the response and start tracking your water intake!

This app is made to track daily intakes of water and was built to work with a date selector in mind.
