const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-721230650737-727628267029-lv1mxKkFfKLqvVWpFHUoi9RO',
    name: 'HDAvalon-bot'
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