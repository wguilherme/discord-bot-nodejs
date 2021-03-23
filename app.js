const Discord = require("discord.js");
const client = new Discord.Client();
const schedule = require('node-schedule');

const { port, token, channelId, channelName, ngrokPort, project } = require("./env.json")

const express = require("express");
const cors = require("cors");
const ngrok = require('ngrok');


const app = express();
app.use(cors());
app.use(express.json())

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
//    await client.channels.get('806175198763417651').send('Hello here!');
});

app.listen(port, async (err) => {
    if (err) return console.log(`Something bad happened: ${err}`);
    console.log(`Node.js server listening on ${port}`);


    const url = await startNgrok(ngrokPort)
    await sendMessageByName(`Ngrok iniciado, projeto: ${project}. Link: ${url}`, channelName)  

    
    try {
        // '0 */1 * * *' by hour
        // '*/1 * * * * *' by second
        const job = schedule.scheduleJob('0 */2 * * *', async function(){            
            const url = await startNgrok(ngrokPort)
            await sendMessageByName(`Aaapa, ngrok atualizado automaticamente, projeto: ${project}. Link: ${url}`, channelName)   
        });
          
        client.on("message", async (msg) => {

            if (msg.content === "!ngrokStart") {
                const url = await startNgrok(ngrokPort)
                msg.reply(`Aooo, ngrok no ar fi, projeto: ${project}, link: ${url}`);

            }
            if (msg.content === "!ngrokRestart") {
                const url = await startNgrok(ngrokPort)
                msg.reply(`Aooo, ngrok reiniciado! Projeto: ${project}. Tá na mão: ${url}`);
            }
        });
    } catch (error) {
        await sendMessageByName(`Ocorreu um erro: ${error.message}`, channelName)        
    }
});


async function startNgrok(port){

    await ngrok.disconnect()
    await ngrok.kill()

    const url = await ngrok.connect(port);
    if(!url) throw new Error("Não foi possível iniciar o NGROK.")
    return url
}
// client.on('ready',  () => {
//     // Routes
//     app.post('/msg/:channelName', async (req, res) =>{    
//         const {message} = req.body
//         const {channelName} = req.params    

//         try {
//             await sendMessageByName(message, channelName)        
            
//         } catch (error) {
//             res.status(400).json(error.message)
//         }
//         res.status(200).json({message: "Message sent successfully"})    
//     })    
// })

function sendMessageByName(message, channelName){    
    const channel =  client.channels.cache.find(channel => channel.name === channelName)
    channel.send(message)    
    console.log('Message sent')
}

// client.on('ready', () => {
//     channel.send('Lorem ipsum')
//     console.log(channel.name)
// })

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

// client.on('ready', () => {
//     const channel = client.channels.cache.find(channel => channel.name === 'dev')
//     channel.send('Lorem ipsum')
//     console.log(channel.name)
// })

client.on('ready', () => {
client.channels.fetch(channelId)
  .then(channel => console.log(channel.name))
  .catch(console.error);
})

// const channel = client.channels.get("806175198763417651");
// message.channel.send("Test").then(sentMessage => sentMessage.edit("Blah"));
// message.guild.channels.find(channel => channel.name === "channel-name");

client.login(token);