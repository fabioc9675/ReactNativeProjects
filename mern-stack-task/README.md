# Creation of new app with Mongo DB and React Js

## folders:

app: contains react code
models: contains database models
public: contains html and css code coverted from reactjs
routes: contains routing between code

## init nodejs app

`npm init --yes`

## Modules

`npm install express` framework for nodejs
`npm install nodemon -D` to automatically restart server when the code changes
`npm install morgan` allows to watch the request from clients
`npm install mongoose` allows to connect withh database

## Local Database

### Initialization

- `sudo apt install mongodb`
- `sudo systemctl enable mongodb`
- `sudo systemctl start mongodb`
- `mongod` these commands initiate the daemon to execute mongodb
