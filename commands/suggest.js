const Discord = require("discord.js")
const rbx = require("noblox.js")
const config = require("../config.json");
module.exports.run = async (Client, message, args, guildMemberAdd, member) => {
 

args =  message.content.slice(config.prefix.length).split(' ');  //Get the arguments
const command = args.shift().toLowerCase();  //Making the command non case-sensitive



  //finds the channel named suggestions 


  const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('New suggestion!')
	
	
	.setDescription('Suggestion: ' + args.join(' '))

	
	
	.setTimestamp()
  
  const suc = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(':white_check_mark: Thank you!')
	
	
	.setDescription('You have successfully sent a suggestion!')

	
	
	.setTimestamp()
   let boi = Client.channels.cache.get('722598461375250453').send(exampleEmbed)
   message.author.send(suc)

}     //Closes the if (command === 'suggest'){ 
;   //Closes the client.on('message',msg => {
