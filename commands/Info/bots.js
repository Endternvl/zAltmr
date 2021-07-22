const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'allbots',
    description: 'show all bots in guild',
    usage: 'allbots',
    category: 'info',
    run: async (client, message, args) => {
    
    let checked = '<:online:826091925945319474>';
    let unchecked = '<:offline:826092002886025246>';


    const allbots = message.guild.members.cache.filter(m => m.user.bot).map((m) => m).map((m) => `${m.user.flags ? checked : unchecked} ${m.user.tag} (${m.id})`).join('\n');

    const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(allbots)
    .setFooter(client.user.tag, client.user.displayAvatarURL())
    .setTimestamp();
    message.channel.send(embed)
  }
};