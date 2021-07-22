const Discord = require('discord.js');
module.exports = {
  name: "clown",
  description: 'Clowns a people!',
  bot: ['SEND_MESSAGES'],
  cooldown: 10,
  run: async(client, message, args) => {
     const user = message.member;
     const mentioned = message.mentions.members.first();
     if(mentioned) return message.reply('Only you can be clowned');
let msg = await message.channel.send('loading...')
      let att = new Discord.MessageAttachment(`https://api.popcatdev.repl.co/clown?image=${user.user.displayAvatarURL({ dynamic: false, format: "png"})}`, `${user.user.username}_clown.png`)

      message.channel.send(att)
      msg.delete()
  }
}