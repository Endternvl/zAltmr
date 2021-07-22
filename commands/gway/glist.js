const Discord = require('discord.js');

module.exports = {
  name: 'glist',
  description: 'Giveaway list',

  run: async(client, message, args) => {
        let giveaways = client.giveawaysManager.giveaways.filter(g => g.guildID === `${message.guild.id}` && !g.ended)
    if (!Array.isArray(giveaways)) return message.channel.send('💥 No Giveaways To Be Displayed')
    let embed = new Discord.MessageEmbed()
        .setTitle("Currently Active Giveaways")
        .setColor("#406da2")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
    await Promise.all(giveaways.map(async (x) => {
        if (x.extraData) {
            const guild = client.guilds.cache.get(x.extraData.server)
            const channel = guild.channels.cache
                .filter((channel) => channel.type === 'text')
                .first()
            const inv = await channel.createInvite()
            await embed.addField(`Join Requirement Giveaway:`, `**Prize:** **[${x.prize}](https://discord.com/channels/${x.guildID}/${x.channelID}/${x.messageID})**\n**Requirement: [This Server](${inv})**\n**Started At: \`${new Date(x.startAt)}\`**\n**Ends At:** \`${new Date(x.endAt)}\`\n**Host:** ${x.hostedBy}`)
        } else {
            embed.addField(`Normal Giveaway:`, `**Prize:** **[${x.prize}](https://discord.com/channels/${x.guildID}/${x.channelID}/${x.messageID})\nStarted At: \`${new Date(x.startAt)}\`**\n**Ends At:** \`${new Date(x.endAt)}\`\n**Host:** ${x.hostedBy}`)
        }
    }));
    message.channel.send(embed)
  }
}