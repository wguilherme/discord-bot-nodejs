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

// client.on('message', message => {  
//     message.channel.send('pong');
//   });


client.on("message", msg => {

    if (msg.content === "!ping") {
        msg.reply("pong!");
    }
});





client.on('ready', () => {
    const channel = client.channels.cache.find(channel => channel.name === 'bot-lab')
    channel.send('Lorem ipsum')
    console.log(channel.name)
})


client.on('ready', () => {
client.channels.fetch('806175198763417651')
  .then(channel => console.log(channel.name))
  .catch(console.error);
})


// const channel = client.channels.get("806175198763417651");
// message.channel.send("Test").then(sentMessage => sentMessage.edit("Blah"));
// message.guild.channels.find(channel => channel.name === "channel-name");






client.login(token);