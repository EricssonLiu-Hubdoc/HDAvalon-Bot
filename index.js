const SlackBot = require('slackbots');
const axios = require('axios');
const fetch = require('node-fetch');

const RoboMerlin_Username = 'UMDJG7V0V'

const bot = new SlackBot({
    token: 'xoxb-721230650737-727628267029-9TjwsMOVjfV8WNRDduU2Z1FH',
    name: 'RoboMerlin',
});

bot.on('start', () => {
    bot.postMessageToChannel('slack-bot', 'Avalon Bot Starting Up', {});
});

bot.on('message', (data) => {
    console.log(data);
    if (data.type !== 'message') {
        return;
    }
    else if (!data.text.includes(RoboMerlin_Username)) {
        return;
    }
    handleMessage(data.text);
})

let roles = {};
let winningTeam;
let merlinAssassination = null;

async function handleMessage(message) {
    if (message.includes('newgame')) {
        roles = createGame ();
    }
    else if (message.includes('add')){
        roles = await addRoles (message, roles);
    }
    else if (message.includes('win')){
        if (message.includes('good')){
            winningTeam = true;
        }
        else if (message.includes('bad')){
            winningTeam = false;
        }
        else {
            return bot.postMessageToChannel('slack-bot', 'Are you stupid enter good win or bad win it\'s not that hard', {});
        }
    }
    else if (message.includes('assassination')){
        merlinAssassination = true;
    }
    else if (message.includes('finish')){
        if (roles.count < 6){
            return bot.postMessageToChannel('slack-bot', 'Not enough players have been entered (minimum 6)', {})
        }
        const query = finishGame (roles, winningTeam);
    }
}

function createGame() {
    return {
        count: 0,
        merlin: null,
        percival: null,
        servant: [],
        mordred: null,
        morgana: null,
        assassin: null,
        oberon: null,
        minion: [],
    }
};

// function that takes in an id and returns the associated name
async function getNameByID (id) {
    let username;
    if(!id) {
        return;
    }
    else {
        id = id
            .replace('<@', '')
            .replace('>', '');
    }
    await bot
        .getUsers()
        .then((users) => {
            console.log(users.members);
            for(const user of users.members) {
                if (user.id == id) {
                    username = user.name;
                }
            }
        });
    return username;
}

async function addRoles(message, roles) {
    if (!roles){
        return bot.postMessageToChannel('slack-bot', 'Please start new game', {})
    }
    message = message.slice(17, message.length)
    const validRoles = ['merlin', 'percival', 'servant', 'mordred', 'morgana', 'assassin', 'oberon', 'minion']
    while (message.length !== 0){
        roles.count ++;
        const currentPlayerID = message.slice(0, message.indexOf(' '));
        message = message.substr(message.indexOf(' ') + 1, message.length);
        const currentPlayer = await getNameByID(currentPlayerID);
        const currentRole = message.slice(0, (message.indexOf(' ') === -1) ? message.length : message.indexOf(' ')).toLowerCase();
        if (message.indexOf(' ') === -1){
            message = '';
        }
        else {
            message = message.substr(message.indexOf(' ') + 1, message.length);
        }
        if (!(validRoles.includes(currentRole))){
            return bot.postMessageToChannel('slack-bot', 'Role does not exist try again.', {})
        }
        if (currentRole === 'minion' || currentRole === 'servant'){
            roles[currentRole].push(currentPlayer);
        }
        else {
            roles[currentRole] = currentPlayer;
        }
    }
    console.log(roles);
}

async function finishGame (roles, winningTeam, merlinAssassination){
    const gameData = {
        roles: roles,
        winningTeam: winningTeam,
        merlinAssassination: merlinAssassination,
    }
    gameData = JSON.stringify(gamdData);
    await fetch("http://10.254.59.72:3001/api/players", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: gameData,
    }).then(function() {
        return;
    });
    console.log("finished");
}