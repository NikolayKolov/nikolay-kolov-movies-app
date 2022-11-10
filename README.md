# Simple movies app

This is a simple test project built using React, Redux, TypeScript and SASS.
It loads a list of movies from a static JSON file in a Redux store.
The user can add, edit and delete a movie from the store.
The user can search for a movie with special filters and sort options.
The fields are validated and show appropriate error messages.
The app interface is responsive and has a light/dark theme switcher.

Instructions to start and run the project are below.

    Go to Start > Windows System > Command Prompt > type node -v to check if you have node.js installed If not, go to nodejs.org, download and install the appropriate version.
    Open Visual Studio Code (VSCode). If you don't have it, go to code.visualstudio.com/download, get the appropriate version and install.
    Unzip the folder where you want to.
    Open VSCode > File > Open Folder > open the unzipped folder.
    Go to Terminal > New Terminal > type "npm install" and wait for the installation process to finish.
    On bottom left panel, there should be a section called NPM SCRIPTS. Expand it and run the start script to run the project in development mode. It will open the app in the default internet browser.
    If you are satisfied with the app, click run NPM script build, which will create a production version of the project. The folder is called /build and is placed in the main app folder. Go there and open file index.html to run production version.
    The main file for the app is src/components/RegistrationForm.jsx and it has comments describing the main logic.

Below is the default Readme from the create-react-app npm module that was used for the creation of this app.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
