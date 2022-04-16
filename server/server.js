const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, "../dist");

const ip = '127.0.0.1';
const port = 2000;

const server = app.listen(port, ip, () => {
    console.log('server running'+ip+":"+port);
});

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
})

//initialize socketio
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    let userCredit = 10;
    let gameCredit = 0;
    let gameRolls = 0;

    console.log('new user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    // socket.on('sendMessage', (message) => {
    //     console.log('message: '+message);
    //     io.emit('newMessage', {
    //         text: message
    //     });
    // });
    // socket.on('sendLocation', (location) => {
    //     console.log('location: '+location);
    //     io.emit('newLocation', {
    //         latitude: location.latitude,
    //         longitude: location.longitude
    //     });
    // });

    // socket.on('test', x=> {
    //     console.log(x);
    // });

    socket.on('init', x=> {
        console.log('init');
        socket.emit('init', {
            userCredit,
            gameCredit,
            gameRolls
        });
    });

    const checkRewardEligibility = (result) => {
        if(result === '000'){
            //melon win
            gameCredit += 40;
            return {win: '0', result};
        }else if (result === '111'){
            //banana win (should be lemon, but we're using banana instead)
            gameCredit += 20;
            return {win: '1', result};
        } else if (result === '222'){
            //cherry win 10 credits reward
            gameCredit += 10;
            return {win: '2', result};
        } else if (result === '333'){
            //orange win 30 credits reward
            gameCredit += 30;
            return {win: '3', result};
        } else {
            //no win
            return {win: null, result};
        }
    }

    const spin = () => {
        // generates 3 digit number with possible slot values (0-3)
        const roll = () => {
            let result = '';
            for (let i = 0; i < 3; i++) {
                result += Math.floor(Math.random() * 4);
            }
            return result;
        }
        let result = roll();
        if (gameCredit >= 40 && gameCredit < 60 && (Math.random()>0.7)) {
            // if in-game credit (not the user account one)
            // is between 40 and 60 and a random number is greater than 0.7 (30% chance);
            // then roll again
            console.log('rolling again');
            result = roll();
        }else if (gameCredit >= 60 && (Math.random()>0.4)) {
            // if in-game credit is over 60 and a random number
            // is greater than 0.4 (60% chance) then roll again
            console.log('rolling again');
            result = roll();
        }

        // return result;

        return checkRewardEligibility(result);
    };

    socket.on('spin', x=> {
        console.log('spin');
        if(userCredit > 0){
            gameRolls++;
            userCredit = userCredit - 1;
            socket.emit('spin', {...spin(), userCredit, gameRolls});
        }else{
            socket.emit('spin', {error: 'No more credits.'})
        }
    });

    socket.on('info', x=> {
        console.log('info');
        socket.emit('info', {
            userCredit,
            gameCredit,
            gameRolls
        });
    })

    socket.on('cashout', x=> {
        console.log('cashout');
        if(gameCredit > 0) {
            userCredit = userCredit + gameCredit;
            gameCredit = 0;
            socket.emit('cashout', {
                userCredit,
                gameCredit
            });
        }else{
            socket.emit('cashout', {error: 'Nothing to withdraw.'})
        }
    });
})