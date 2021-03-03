This is a a small server for the chat application, where user can join by typing a name for the room and a username. All users that type the same room name ( it is case sensitive ) will join the same room automatically. It uses real time communication with socket.io.

## To run the backend project :

### `yarn` ou `npm install`

- Once you're inside the backend directory in your terminal, run `yarn` or `npm install`, according to the package manager you're using. This command will install all the necessary dependencies to run the project.

- Finally, run `yarn dev:server` or `npm run dev:server` to run the server. This server is used to communicate with the web interface, so when using the web interface, this has to be running simultaneously.
