const app = require('express')();
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: {
        origins : ['http://localhost:8100']
    }
});
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');
const mysql = require('mysql');

const session = require("express-session")({
    secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false
    }
});

const account = require('./modules/checkingAccounts.js');
const mail = require('./modules/sendMail');
const battleSQL = require ('./modules/battle&SQL');
const socketFile = require('./modules/socket');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session);
app.use(cors({origin: true, credentials: true}));

if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    session.cookie.secure = true;
}

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bn'
});

function preventDisconnect() {
    con.connect(err => {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(preventDisconnect, 5000);
        } else {
            console.log('Connexion base de donnée effectuée');

            app.post('/signUp', function (req, res) {
                account.signUp(req.body.name, req.body.password, req.body.mail, req.session.id, con, res);
            });

            app.post('/resetPassword', function (req, res) {
                account.resetPassword(req.body.id, req.body.password, con, res);
            });

            app.post('/getUserIdByUsername', function (req, res) {
                account.getUserIdByUsername(req.body.name, con, res);
            });

            app.post('/mailToken', function (req, res) {
                mail.sendToken(req.body.mail, req.body.name, req.body.password, con, req.session.id, res);
            });

            app.post('/checkToken', function (req, res) {
                mail.checkToken(req.body.mail, req.body.token, res);
            });

            app.post('/sendResetPassword', function (req, res) {
                mail.resetPassword(req.body.mail, req.session.id, con, res);
            });

            app.post('/login', function (req, res) {
                account.login(req.body.name, req.body.password, req, con, res);
            });

            app.post('/getUserListExceptOne', function (req, res) {
                account.getUserListExceptOne(req.body.name, con, res);
            });

            app.post('/lastConnected', function (req, res) {
                account.lastConnected(req.body.name, con, res);
            });

            app.post('/addFriend', function (req, res) {
                account.addFriend(req.body.user1, req.body.user2, con, res);
            });

            app.post('/getUserFriends', function (req, res) {
                account.getUserFriends(req.body.name, con, res);
            });

            app.post('/askFriend', function (req, res) {
                account.askFriend(req.body.from, req.body.to, con, res);
            });

            app.post('/getUserDemandsSent', function (req, res) {
                account.getUserDemandsSent(req.body.name, con, res);
            });

            app.post('/getUserDemandsReceived', function (req, res) {
                account.getUserDemandsReceived(req.body.name, con, res);
            });

            app.post('/deleteFriendship', function (req, res) {
                account.deleteFriendship(req.body.username1, req.body.username2, con, res);
            });

            app.post('/deleteDemand', function (req, res) {
                account.deleteDemand(req.body.sender, req.body.receiver, con, res);
            });

            app.post('/saveDeck', function (req, res) {
                battleSQL.saveDeck(req.body.username, req.body.matrix, req.body.race, req.body.deckName, con, res);
            });

            app.post('/getDeckNames', function (req, res) {
                battleSQL.getDeckNames(req.body.username, con, res);
            });

            app.post('/getMatrix', function (req, res) {
                battleSQL.getMatrix(req.body.deckName, con, res);
            });

            app.post('/overwrite', function (req, res) {
                battleSQL.overwrite(req.body.username, req.body.matrix, req.body.race, req.body.deckName, con, res);
            });

            app.post('/getNumberOfShips', function (req, res) {
                battleSQL.getNumberOfShips(req.body.race, con, res);
            });

            app.post('/deleteFromDatabase', function (req, res) {
                battleSQL.deleteFromDatabase(req.body.deckName, con, res);
            });

            app.post('/test', function (req, res) {
                //test action
            });

            let intoRoom = [];
            let rooms = [];

            io.on('connection', (socket) => {

                console.log('Somebody connected');

                socket.on('enterRoom', () => {
                    intoRoom = socketFile.enterRoom(intoRoom, socket);
                    console.log(intoRoom);
                });

                socket.on('notReadyAnymore', () => {
                    intoRoom = socketFile.ready(intoRoom, socket, false);
                    console.log(intoRoom);
                });

                socket.on('disconnect', () => {
                    intoRoom = socketFile.disconnect(intoRoom, socket);
                    console.log(intoRoom);
                })

                socket.on('ready', () => {
                    intoRoom = socketFile.ready(intoRoom, socket, true);
                    console.log(intoRoom);
                    let sendToRoom = socketFile.checkReady(intoRoom);
                    if(sendToRoom.fill) {
                        console.log('ici');
                        socket.to(sendToRoom.p1.id).emit('toGame');
                        console.log(intoRoom);
                        console.log('là');
                        socket.to(sendToRoom.p2.id).emit('toGame');
                        console.log(intoRoom);
                        console.log('bouh');
                    }
                });
            });
        }
    });

    con.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            preventDisconnect();
        } else {
            throw err;
        }
    });
}

preventDisconnect();

http.listen(8080, () => {
    console.log('Serveur lancé sur le port 8080');
})
