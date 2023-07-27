const express = require('express')
const app = express()
const port = 3000

const {createServer} = require('http');
const {Server} = require('socket.io')
const httpServer = createServer(app);
const {sequelize} = require('./DB')


const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const outerApi = require('./routes/allUsers')
const innerApi = require('./routes/innerApi')
const adminChat = require('./routes/adminChat')

const {Room} = require('./models/room')

const ChatService = require('../server/service/chatService')
const chatService = new ChatService()

const bodyParser = require('body-parser');

const io = new Server(httpServer, {});

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(express.json())
app.use('/user', outerApi)
app.use('/catalog', outerApi)
app.use('/login', innerApi)
app.use('/admin-panel', innerApi)
app.use(bodyParser.json());
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {explorer: true})
);
app.use('/admin-chat', adminChat)
let userInfo = {}
let chekRoom = {}
io.on("connection", async (socket) => {
    try {
        let room
        let history
        let check;
        socket.on('getInfoUser', async (data) => {
            userInfo = data
            if (data.roles !== null) {
                room = await chatService.getAllRooms();
                socket.emit('get-rooms', room)
                socket.on('join_room', async (room_data) => {
                    try {
                        console.log(room_data)
                        const history = await chatService.getAllMessage(room_data.item.id);
                        socket.join(room_data.item.name);
                        socket.emit('history', history);
                    } catch (e) {
                        console.error(e);
                    }
                });

                socket.on('leave_room', room_data => {
                    try {
                        chekRoom = room_data.item
                        if (room_data.item.id) {
                            console.log('true')
                            socket.leave(room_data.item.name);
                        }
                    } catch (e) {
                        console.error(e);
                    }
                });
                socket.on('msg', async (args) => {
                    try {
                        console.log(chekRoom);
                        await chatService.messageFromAdmin({...args,room_id: chekRoom.id})
                        io.to(chekRoom.name).emit('message',args )
                    } catch (err) {
                        console.error(err)
                    }
                })

            }
            let userRoom_id
            if (data.roles === null) {
                room = await chatService.getRooms('room' + data.user_id);
                socket.emit('get-rooms', room)
                socket.emit('history', history)
                room.forEach((item) => {
                    if (item.dataValues.name === `room${data.user_id}`) {
                        userRoom_id = item.dataValues.id
                        socket.emit('getRoom_id', userRoom_id)
                        check = true
                    }
                })
                if (check) {
                    console.log(`check = true`)
                    io.to(`room + ${data.user_id}`)
                    console.log(data)
                    history = await chatService.getMessage(userRoom_id);
                    socket.emit('history', history);
                } else {
                    console.log(`check = false`)
                    const room = await chatService.CreateRoom({name: `room${data.user_id}`})
                    socket.emit('rooms-list-changed', room)
                    socket.broadcast.emit('rooms-list-changed', room)
                }
                socket.on('msg', async (args) => {
                    try {
                        console.log(args)
                        await chatService.saveMessages(args)
                        io.to(`room33`).emit('message', args)
                    } catch (err) {
                        console.error(err)
                    }
                })

            }
        })
    } catch (err) {
        console.log(err)
    }


});

httpServer.listen(3001, () => {
    console.log(`Start socket io server`)
});

app.listen(port, async () => {
    try {
        await sequelize.sync({
            alter: false,
            force: false,
        })
    } catch (err) {
        throw err
    }
})
