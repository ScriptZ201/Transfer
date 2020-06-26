const Discord = require("discord.js")
const rbx = require("noblox.js")
const config = require("../config.json");
module.exports.run = async (Client, message, args) => {
 



  const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Commands')
	
	
	.setDescription('.verify roblox username, .suggest, example: .suggest The group should have more admins, .ban @user trolling, .kick @user rude, .userinfo @user')

	
	
	.setTimestamp()
  message.channel.send(exampleEmbed)
}     //Closes the if (command === 'suggest'){ 
;   //Closes the client.on('message',msg => {
