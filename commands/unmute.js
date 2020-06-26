// If the command is like: -tempMute <mention> <minutes> [reason]
exports.run = (client, message, [mention, minutes, ...reason]) => {
  // You need to parse those arguments, I'll leave that to you

  // This is the role you want to assign to the user
  let mutedRole = message.guild.roles.cache.find(role => role.name == "Muted");
  // This is the member you want to mute
  let member = message.mentions.members.first();

  // Mute the user
  member.roles.remove(mutedRole, `Muted by ${message.author.tag} for ${minutes} minutes. Reason: ${reason}`)
message.channel.send("You have unmuted " + member.user.username).catch((err) => {
    console.error(err);
    message.channel.send(member.user.username + " Is already unmuted")
    var x = err.message;
});
  // Unmute them after x minutes
  
};