const discord = require('discord.js');

module.exports = {
  name: 'dm',
  description: 'send a user a dm',
  bot: ['ADMINISTRATOR'],
  permissions: ["ADMINISTRATOR"],

  run: async(client, message, args) => {
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.channel.send('Please mention a user to DM')

    let dm = args.slice(1).join(" ")
    if(!dm) return message.channel.send("I can't dm an empty message")
    if(dm.length > 200){
      return message.reply('You cant send a message more than 200 characters long!')
    }

    try {
      const embed = new discord.MessageEmbed()
      .setDescription(`${dm}`)
      .setFooter(`Author: ${message.author.tag}`)
      .setColor('RANDOM')
        await user.send(embed)
    } catch (error) {
        return message.channel.send('This user have DMs Closed i can\'t dm him/her')
    }
    message.channel.send("Successfully DM the user")
  }
}