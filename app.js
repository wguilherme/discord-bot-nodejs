const Discord = require("discord.js");
const client = new Discord.Client();
const { token } = require("./token.json")

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json())


client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
//    await client.channels.get('806175198763417651').send('Hello here!');
});

app.listen(3000, ()=>{
    console.log('App listening on port 3000')
})


client.on('ready',  () => {
    // Routes
    app.post('/msg/:channelName', async (req, res) =>{    
        const {message} = req.body
        const {channelName} = req.params    

        try {
            await sendMessage(message, channelName)        
            
        } catch (error) {
            res.status(400).json(error.message)
        }
        res.status(200).json({message: "Message sent successfully"})    
    })    
})

function sendMessage(message, channelName){    
    const channel =  client.channels.cache.find(channel => channel.name === channelName)
    channel.send(message)
    
    console.log('Message sent')
}

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