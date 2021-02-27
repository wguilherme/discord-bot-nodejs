const Discord = require("discord.js");
const client = new Discord.Client();
const { token } = require("./token.json")

const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json())


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
 

client.on("message", msg => {
    if (msg.content === "!ngrok") {
        msg.reply("pong!");
    }
});





client.on('ready', () => {
    const channel = client.channels.cache.find(channel => channel.name === 'bot-lab')
    channel.send('Lorem ipsum')
    console.log(channel.name)
})




client.login(token);