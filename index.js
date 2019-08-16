const SlackBot = require('slackbots');
const axios = require('axios');

const RoboMerlin_Username = 'UMDJG7V0V'

const bot = new SlackBot({
    token: 'xoxb-721230650737-727628267029-ShCKD3bSnZJKSnvTtzasefzb',
    name: 'RoboMerlin',
});

bot.on('start', () => {
    const params = {
        icon_emoji: ':clown:'
    };

    bot.postMessageToChannel(
        'slack-bot',
        'Avalon Bot Starting Up',
        params
    );

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
function handleMessage(message) {
    const params = {};
    if (message.includes('newgame')) {
        roles = createGame ();
    }
    else if (message.includes('add')){
        roles = addRoles (roles);
    }
    else if (message.includes('win')){
        if (message.includes('good')){
            winningTeam = true;
        }
        else if (message.includes('bad')){
            winningTeam = false;
        }
        else (){
            return bot.postMessageToChannel('slack-bot', 'Are you stupid enter good win or bad win it\'s not that hard', {});
        }
    }
    else if (message.includes('assassination')){
        merlinAssassination = true;
    }
    else if (message.includes('finish')){
        if (roles.count < 6){
            return bot.postMessageToChannel('slack-bot', 'Not enough players have been entered (minimum 6)', params)
        }
        const query = finishGame (roles, winningTeam);
    }
}

function createGame() {
    return {
        count: 0,
        merlin: null,
        percival: null,
        servants: [],
        mordred: null,
        morgana: null,
        assassin: null,
        oberon: null,
        minions: [],
    }
};

function addRoles(roles) {
    if (!roles){
        return bot.postMessageToChannel('slack-bot', 'Please start new game', params)
    }
    message = message.slice(17, message.length)
    const validRoles = ['merlin', 'percival', 'servant', 'mordred', 'morgana', 'assassin', 'oberon', 'minion']
    while (message.length !== 0){
        roles.count ++;
        const currentPlayer = message.slice(0, message.indexOf(' '));
        message = message.substr(message.indexOf(' ') + 1, message.length);
        //const currentPlayer = something(currentPlayerID);
        const currentRole = message.slice(0, (message.indexOf(' ') === -1) ? message.length : message.indexOf(' ')).toLowerCase();
        if (message.indexOf(' ') === -1){
            message = '';
        }
        else {
            message = message.substr(message.indexOf(' ') + 1, message.length);
        }
        if (!validRoles.includes(currentRole)){
            return bot.postMessageToChannel('slack-bot', 'Role does not exist try again.', params)
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

function finishGame (roles, winningTeam, merlinAssassination){
    
}