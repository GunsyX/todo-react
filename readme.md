# A Minimalistic Todo App

A responsive and very minimal yet straight to the point todo app.
Behind the scenes, the app features a statehouse component that houses all the global state, dedicated controllers for tasks, users, and the main data. An automated interface for the localstorage database to be managed so the localstorage is completely abstracted away from tasks and users' controllers. While it is minimal on the UI, it is packed on the simple yet sophisticated architecture.
Finished this in about 10-14 hours in total, while the actual main todo part was done in about 3 hours.

This project has been forked off one of my own tiny boilerplate for react projects. <b>All code is 100% owned and written by me.</b>

Pulled 2 all nighters to do this since I don't get time during the day as much because of my current job.

Requirements:
- Node 16.x or higher
- NPM 8.x or higher
- Git 2.x or higher

Steps [Ubuntu 20.04]:
- Clone the repo, cd into it and run `npm install`
- Run `npm start`
- Open http://[SERVER_IP]:4000/

Commands:
- `npm install`: Install all dependencies
- `npm start`: Start the dev server
- `npm build:dev`: Make a dev build
- `npm run build:prod`: Make a production build

Run `npm run start` on the project root directory.
Access the demo at `http://127.0.0.1:4000/` on your local host.
