// Require the necessary discord.js classes
require('dotenv').config()
const {Client, Events, GatewayIntentBits} = require('discord.js');

const twitterRegex = /https:\/\/twitter\.com\/[a-zA-Z0-9_]{1,15}\/status\/[0-9]+/

// Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}!`);
    client.user.setPresence({
        status: "idle"
    });
});

client.on(Events.MessageCreate, async message => {
    const {content} = message;
    if (twitterRegex.test(content)) {
        await message.suppressEmbeds(true);
        const matched = content.match(twitterRegex)[0]
        const [urlPart, identifier] = matched.split('twitter.com')
        await message.reply({
            content: `Twitter link replaced with VXTwitter: ${urlPart}vxtwitter.com${identifier}`,
            allowedMentions: {
                repliedUser: false
            }
        })
    }
})

// Log in to Discord with your client's token
client.login(process.env.TOKEN).then(r => r);
