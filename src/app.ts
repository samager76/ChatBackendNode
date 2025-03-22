import express, { Express } from "express";
import { Server } from "socket.io";
import cors from "cors";
import { sequelize } from "./data/database";
import { user_router } from "./routes/user_router";
import { jwt_auth_socket } from "./middleware/jwt_auth_middleware";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: [`${process.env.ORIGIN}`],
        methods: ["GET", "POST"],
    })
);
app.use("/api/user", user_router);

const server = app.listen(process.env.PORT, async () => {
    console.log(`Listening on port ${process.env.PORT}.`);
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Database connection established.");
    } catch (error) {
        console.log("Database connection failed.");
    }
});

const io: Server = new Server(server, {
    path: "/api/socket",
    cors: {
        origin: [`${process.env.ORIGIN}`],
    },
});

io.use(jwt_auth_socket());

io.on("connection", async (socket) => {
    console.log(`${socket.id} connected`);

    socket.on("disconnect", (reason) => {
        console.log(`${socket.id} disconnected`);
    });

    socket.on("join-room", (room) => {
        socket.join(room);
    });

    socket.on("leave-room", (room) => {
        socket.leave(room);
    });

    socket.on("message", (room, username, message) => {
        io.to(room).emit("message", room, username, message);
    });
});
