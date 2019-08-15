const SlackBot = require('slackbots');
const axios = require('axios');

const RoboMerlin_Username = 'UMDJG7V0V'

const bot = new SlackBot({
    token: 'xoxb-721230650737-727628267029-dQugSFaeQ4Py0RHAbbGbMVaQ',
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

function handleMessage(message) {

    const params = {
        icon_emoji: ':clown:'
    };

    if (message.includes('test')) {
        bot.postMessageToChannel('slack-bot', 'Woof', params);
    }
}