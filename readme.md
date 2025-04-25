# Chat Backend with Node, Express, Typescript

This Chat Backend creates an HTTP server and a Socket.IO server.
The user can register and login with as username and password. The password is hashed.
The userdata is saved using Sequelize and SQLite.
A logged in client receives a JWT for the authentication of requests.
The authentication middleware is written for the HTTP and Socket.IO connection.