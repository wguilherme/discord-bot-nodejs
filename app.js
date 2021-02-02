const Discord = require("discord.js");
const client = new Discord.Client();
const { token } = require("./token.json")

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
//    await client.channels.get('806175198763417651').send('Hello here!');
});

// Create an event listener for messages
client.on('message', message => {
    // If the message is "ping"
    if (message.content === 'ping') {
      // Send "pong" to the same channel
      message.channel.send('pong');
    }
  });


client.on("message", msg => {

    if (msg.content === "!hello") {
        msg.reply("Hello world!");
    }
});





client.login(token);