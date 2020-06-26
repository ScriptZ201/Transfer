
const express = require("express");
const app = express();
require("/app/express.js")
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();

const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!

client.on('ready', () => {
  setInterval(() => {
    let guilds = client.guilds.cache.array();
    let users = [];

    for (var i = 0; i < guilds.length; i++) {
      let members = guilds[i].members.cache.array();

      for (var i = 0; i < members.length; i++) {
        if (members[i].user.id !== client.user.id && users.indexOf(members[i].user.id) === -1) users.push(members[i].user.id);
      }
    }
 console.log("Got useres")
    app.get('/totalmembercount', (req, res) => res.send(`${users.length} user${users.length !== 1 ? 's are using CenterBlox API' : ''}`))
app.get("/", (req, res) => {
  console.log("Ping received!");
  res.sendStatus(200);
});
    client.user.setActivity(`${users.length} user${users.length !== 1 ? 's using CenterBlox API in total! Powered by CenterBlox: centerbloxrblx.heliohost.org' : ''}`, {type: 'WATCHING'})
   
    .catch(err => console.error());
  }, 10000);

  
  
  
});
  
  

client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);


client.on( "guildMemberAdd", member => {
let textChannel = client.channels.cache.get('722601852994060328');

if (textChannel){
        var messages = [
            `Brace yourselves. <@${member.user.id}> just joined the server.`,
            `Challenger approaching - <@${member.user.id}> has appeared`,
            `Welcome <@${member.user.id}>. `,
            `Big <@${member.user.id}> showed up!`,
            `<@${member.user.id}> just joined... or did they?`,
            `Welcome <@${member.user.id}>`,
            `<@${member.user.id}> hopped into the server. `,
            `<@${member.user.id}> joined. You must construct additional pylons.`,
            `Hello. Is it <@${member.user.id}> you're looking for?`,
            `Where's <@${member.user.id}> in the server!`,
            `Don't have a weapon? Take <@${member.user.id}>`
        ]

        textChannel.send({embed: {
            color: 3447003,
            description: messages[ Math.floor( Math.random() * 11 ) ],
            timestamp: new Date(),
        }
        }); 
    }
});

client.on( "guildMemberRemove", member => {
let textChannel = client.channels.cache.get('722601852994060328');

if (textChannel){
        var messages = [
            `<@${member.user.id}> left`]

        textChannel.send({embed: {
            color: 3447003,
            description: messages[ Math.floor( Math.random() * 11 ) ],
            timestamp: new Date(),
        }
        }); 
    }
});





  client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith(config.prefix + 'kick')) {
    
        
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to kick the member. User might be a mod.');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }
  
});







client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith(config.prefix + 'ban')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member
          .ban({
            reason: 'They were bad!',
          })
          .then(() => {
            // We let the message author know we were able to ban the person
            message.reply(`Successfully banned ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to ban the member. User might be a mod');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
    } else {
      // Otherwise, if no user was mentioned
      message.reply("You didn't mention the user to ban!");
    }
  }
});




app.get("/", (request, response) => {
  console.log("Ping received!");
  response.sendStatus(200);
});


const http = require('http');


var keepAlive = require("node-keepalive");
keepAlive({}, app);
var server = require('http').createServer(app);
var rsCount = 1;
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  //response.sendStatus(200);
  response.sendFile(__dirname +"/views/index.html");
});

app.get("/keepalive", (request, response) => {
  console.log(Date.now() + " Ping Received");
  //response.sendStatus(200);
  response.sendFile(__dirname +"/views/index.html");
});



app.get('/Dashboard', (req, res) => res.send('The bot is running. Status: Up and running!'))
app.get("/", (req, res) => {
  console.log("Ping received!");
  res.sendStatus(200);
});
app.get("/Dashboard", (req, res) => { 
  console.log("Ping received!");
  res.sendStatus(200);
});

const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/keepalive`);
  
}, 280000);

// listen for requests :)






const axios = require("axios");
const discord = require("discord.js");

const roblox = require("noblox.js");


let token = config.token
let scriptID =
  "AKfycbzOddS8ehKCI2xEetaQzURsYLGE5vvcctQ2qY4OIbblsXydMqk" + "/exec";
let BOTID = 1;
client.login(token);

client.on("ready", () => {
  console.log("Ready");
});

 
/*INSERT GROUP ID AND COOKIE ABOVE*/
 
 





let prefix = ";";

function isCommand(command, message) {
  var command = command.toLowerCase();
  var content = message.content.toLowerCase();
  return content.startsWith(prefix + command);
}
client.on("message", message => {
  if (message.author.id != BOTID) {
    if (message.member != null) {
      const acceptedRoles = [
        "Moderator",
        "Administrator",
        "Developers",
        "Owner",
        "Bot"
      ];
      const getModRole = message.member.roles.cache.find(role =>
        acceptedRoles.includes(role.name)
      );
      if (!getModRole) {
        console.log("No role found");
      } else if (getModRole) {
        const args = message.content.slice(prefix.length).split(" ");
        if (isCommand("Ban", message) && isNaN(args[1]) == false) {
          let reason = args.slice(2).join(" ");
          console.log("Banning player UserId " + args[1]);
          let embed = new discord.MessageEmbed()
            .setColor("#ff1a1a")
            .addField("Banned player UserId " + args[1], "Reason: " + reason)
            .addField(
              "User banned by: " + message.member.user.tag,
              "User is banned"
            )
            .setFooter(`CenterBlox`, client.user.avatarURL);
          message.channel.send(embed);
          axios.post(
            "https://script.google.com/macros/s/" +
              scriptID +
              "?sheet=Global&key=" +
              args[1] +
              "&value=" +
              true +
              "&reason=" +
              reason +
              "&moderator=" +
              message.member.user.tag,
            {}
          );
        } else if (isCommand("Unban", message) && isNaN(args[1]) == false) {
          let embed = new discord.MessageEmbed()
            .setColor("#ff1a1a")
            .addField(
              "Unbanned player UserId " + args[1],
              "User has been unbanned"
            )
            .addField(
              "User unbanned by: " + message.member.user.tag,
              "If this was a mistake please contact a HR."
            )
            .setFooter(`CenterBlox`, client.user.avatarURL);
          console.log("Unbanning player UserId " + args[1]);
          message.channel.send(embed);
          axios.post(
            "https://script.google.com/macros/s/" +
              scriptID +
              "?sheet=Global&key=" +
              args[1] +
              "&value=" +
              false +
              "&reason=Unbanned" +
              "&moderator=" +
              message.member.user.tag,
            {}
          );
        }
      }
    }
  }
});



client.on("message", message => {
  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "getuser") {
    let username = args[0];

    if (username) {
      roblox
        .getIdFromUsername(username)
        .then(id => {
          if (id) {
           
            roblox.getPlayerInfo(parseInt(id)).then(function(info) {
              let embed = new discord.MessageEmbed()
                .setColor("#FFFFFF")

                .setThumbnail(
                  `https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`
                )

                // more information, please senpai? you haven't given me anything :(
                .addField("Username", info.username || "Unresolvable", true)
                .addField("User ID", id || "Unresolvable", true)
                .addField("Blurb", info.blurb || "Nothing", true)
                .addField("Status", info.status || "Nothing", true)
                .addField(
                  "Account Age",
                  `${info.age} days old` || "Unresolvable"
                )
                .addField("User Link", `https://roblox.com/users/${id}/profile`)
                .setFooter(`CenterBlox`, client.user.avatarURL);
              message.channel.send({ embed });
            });
          }
        })
        .catch(function(err) {
          message.channel.send("User not found");
        });
    } else {
      message.channel.send(
        "Please provide a valid username, e.g. ';getuser ROBLOX'."
      );
    }
  }
});

client.on("message", message => {
  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "getid") {
    let username = args[0];

    if (username) {
      roblox.getIdFromUsername(username).then(id => {
        if (id) {
          roblox.getPlayerInfo(parseInt(id)).then(function(info) {
            let embed = new discord.MessageEmbed()
              .setColor("#FFFFFF")

              .setThumbnail(
                `https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`
              )

              .addField("User ID", id || "Unresolvable", true)
              .setFooter(`CenterBlox`, client.user.avatarURL);
            message.channel.send({ embed });
          });
        } else console.log("Error");
      });
    } else {
      message.channel.send(
        "Please provide a valid username, e.g. ';getuser ROBLOX'."
      );
    }
  }
});

client.on("message", message => {
  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "link") {
    let username = args[0];
    message.channel.send("https://pastebin.com/edit/APPIDHERE");
  }
});

client.on("message", async message => {
  const filter = msg => msg.author.id == message.author.id;
  const options = {
    maxMatches: 1
  };
  if (message.content === "!color") {
    // request
    message.channel.send("What's your fav color?");

    // collector
    let collector = await message.channel.awaitMessages(filter, options);
    let answer = collector.first().content;

    // response
    await message.reply("your fav color is " + answer + "!");
  }
});

client.on("error", console.error);

client.on("message", async message => {
  const filter = msg => msg.author.id == message.author.id;
  const options = {
    maxMatches: 1
  };
  
  let args = message.content.split(" ").slice(1);
  if (message.content.startsWith(prefix + "linkcounter")) {
    message.channel.send(
      "Awesome you made it! Since we use a API server to receive applications you need to have a key. Please name your key: example: Cafe counter Bot/Hotel Bot");
     

    let collector = await message.channel.awaitMessages(filter, options);
    let answer = collector.first().content;

    await message.channel.send(
      "Congrats! You have created a key to link the member counter!. Paste the key into the box that says KEYHERE. Your bot name is: " +
        answer
    );
    message.channel
      .createWebhook(
        answer,
        "https://tr.rbxcdn.com/e782939fc2f8ba0b69627497359b1b09/420/420/Decal/Png"
      )
      .then(webhook =>
        webhook
          .edit(
            answer,
            "https://tr.rbxcdn.com/e782939fc2f8ba0b69627497359b1b09/420/420/Decal/Png"
          )
          .then(wb => message.author.send(`KEY: ${wb.id}/${wb.token}`))

          .catch(console.error)
      )
      .catch(console.error);
    setTimeout(function() {
      message.channel.send(
        "Please check your dm's. We send you the key as a safety measure to prevent spammers(Also because it's a private key.)"
      );
    }, 3000); //time in milliseconds
  }
});


client.on("message", message => {
  if (message.content.startsWith(prefix + "setup")) {
    if (message.deletable) {
      message.delete();
    }
    message.channel.send("Thanks you for using CenterBlox We are now setting you up!")
    
.catch(console.error)
    
    function myFunc(arg) {
  message.channel.send("Alright! Everything looks good on our end. Lets get you setup. First run ;linkcounter to proceed.")
}

setTimeout(myFunc, 5000, 'funky');
    message.channel.send("Getting things ready...")
    
  }
});




client.on('message', message => {
  if (message.content.startsWith(prefix + "kick")) {
       
     
        if(message.channel.type === 'DM') {
          
            message.channel.send('This command can use only in guide');
            return;
        };

       
        if(!message.member.hasPermission('KICK_MEMBERS')) {
            message.channel.send('You have no permissions to do that');
            return;
        };

  
        let mentionMember = message.mentions.members.first();
        
        if(!mentionMember) {
            message.channel.send('pls mention member witch you need to kick');
            return;
        }

        //Get the highest role of user for compare
        let authorHighestRole = message.member.highestRole.position;
        let mentionHighestRole = mentionMember.highestRole.position;

        //If mention user have same or higher role, so show this error msg
        if(mentionHighestRole >= authorHighestRole) {
            message.channel.send('You can`t kick members with equal or higher position');
            return;
        };

        //Check if your bot can`t kick this user, so that show this error msg 
        if(!mentionMember.kickable) {
            message.channel.send('I have no permissions to kick this user');
            return
        };

        //If all steps are completed successfully try kick this user
        mentionMember.kick()
            .then(() => console.log(`Kicked ${mentionMember.displayName}`))
            .catch(console.error);
    
    }
}
)

client.on('message', msg => {    //This runs when a message is sent.
const args = msg.content.slice(prefix.length).split(' ');  //Get the arguments
const command = args.shift().toLowerCase();  //Making the command non case-sensitive


if (command === prefix + 'suggest'){   //if command is suggest
const channel = msg.guild.channels.find(ch => ch.name === 'suggestions');  //finds the channel named suggestions 

channel.send('Suggestion:\n ' + args.join(' ')) 

  //Sends the arguments
}     //Closes the if (command === 'suggest'){ 
});   //Closes the client.on('message',msg => {


// WELL THIS IS THE END HUH? NOTE TO SELF: DON'T STOP CENTERBLOX AND BEAT MYCENTER



let GROUP_ID = 5323388
let GOAL = 1000
let count = 391
let wid = "721759588457906278"
let wtoken = "kQcsLo0WlZ-tgB7ZabU8StQy_891Aed6dQpN1fKlTFxir79RErtsmtd7pT7f-i4p0R_8"

let webhook = new discord.WebhookClient(wid, wtoken)
async function updateCount() {
    let response = await axios.get(`https://groups.roblox.com/v1/groups/${GROUP_ID}/`)
    let response_count = response.data.memberCount 
    if (count < response_count) {
        console.log(response_count, count) 
     const embed = new discord.MessageEmbed()
.setTitle("New Group Member")
.setDescription(`${response.data.name} | We are at ${response_count} members. Only ${GOAL - response_count} members to go till ${GOAL}!`)
.setFooter("Powered by CenterBlox. © CenterBlox 2020")
webhook.send(embed)
      console.log("Sent")
  if (count == 0) {
            count = response_count
            return;
        }
        count = response_count
    }
}

setInterval(() => {

  updateCount()
}, 9000);









var groupId = 5323388 
var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_DD084580BD15398C10276D1FE6657598C0E96C28DABC94A400823D9AD064F5AFCA8E71DF7B76809EF2F7327C8C63D27995B9FD8727C97380E55D1BAFE6E7717D9B4AC903D743C2D4C9AD9BC6098C9106D204794B92C31757F055B74AD9E46857592556CD568353ED55C0AA546EDB5E773CD186048144FA5B23E29F61154386BFF3063A841A9E5198A947C29B03CBD28D149705E8F501F44B1F6CD0675404AD13DCC92D69817557FDC34FCA5F3588AD54A87C6EF5CE3A66EC9814EBFFB4175A7B0B1FFC3659D70AEE189F421BBD0260D17FDB5EBB586D3417DD77966B48812C750BED3E3CE59DD52A1DC68B712961ED2D36D0D9A241548EA3D769A32EBA43C4077A833FB287B6F1D1E65BC09DB47EBD0CC29C6024DC7AACCABA455EB4C368DCE528A7D48B564F1AB12A3C1C92A9B0FFE85656BCD7"

 
 

const rbx = require("noblox.js");

 
app.use(express.static("public"));
 
async function startApp() {
  await rbx.setCookie(cookie);
  let currentUser = await rbx.getCurrentUser();
  console.log(currentUser.UserName);
}
startApp();
 
app.get("/ranker", (req, res) => {
    var User = req.param("userid");
    var Rank = req.param("rank");
 
    rbx.setRank(groupId, parseInt(User), parseInt(Rank));
    res.json("Ranked!");
});
 
