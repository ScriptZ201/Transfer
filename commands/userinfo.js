const Discord = require("discord.js")
module.exports.run = async (bot, message, args) => {
  let guildMember;

  if (message.mentions.members.first()) {
    guildMember = message.mentions.members.first();
  } else {
    guildMember = message.member;
  }

  // We need the User object aswell for different properties
  const user = message.mentions.users.first()

  let embed = new Discord.MessageEmbed()
    .setAuthor(user.username)
    .setDescription("Users Info", true)
    .setColor("#64FF00", true)
    .addField("Full Username:", `${user.username}${user.discriminator}`, true)
    .addField("ID:", user.id, true)
    .addField("Created at:", user.createdAt, true)
    .addField("Status:", `${user.presence.status}`, true)
    .addField("Game:", `${user.presence.game}`, true)
    
  message.channel.send(embed).catch((err) => {
    message.channel.send("Error")
    
});
    
}