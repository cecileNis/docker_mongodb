# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Documentation

### `npm run jsdoc`

Generate the documentation accessible to web application.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Starting Docker

### Documentation

To start each of the differents scripts which are (Node/MongoDB) and (Python/MySQL)

### `docker-compose -f docker-compose-mongo.yml up -d` to start (Node/MongoDB)

### `docker-compose -f docker-compose-sql.yml up -d` to start (Python/MySQL)

# Starting Test Cypress

### Documentation

Before to start the tests Cypress, you must to start the server Docker

### `npx cypress run`

To open Cypress graphic

### `npx cypress open`

# Composition du groupe

Cécile Niess, Tom Wittke, Vincent Calatayud

# Répartition des tâches

Pour ce qui est de l'initialisation du projet, on a récupéré le projet de Tom avec (frontend en React, tests unitaire et intégration) mais le reste des tâches (docker, dockerfile, api, tests) ont été fait en commun avec tous le monde.
