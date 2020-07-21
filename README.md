# water_tracker_app
A web application that helps you keep track of how much water you drank per day.

## Setting up the server

1. At the root folder in your terminal run `cd server` and install node modules by running `npm intall`

2. Then run the below with your AWS key information in your terminal
   `export AWS_ACCESS_KEY_ID=XXXXXXXXXXXXXXX`
   `export AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXXXX`

3. Then make sure you have serverless installed globally and run `serverless deploy` to start the backend server. 

   (Incase you run into issues: Use this specific version of serverless and ran `npm i serverless@1.35.1 -g` as I ran into this issue on my MacOS)

