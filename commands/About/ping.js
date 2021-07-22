const discord = require("discord.js");

module.exports = {
  name: "ping",
  category: "info",
  description: "Returns latency and API ping",
  run: async (client, message, args) => {

    const msgembed = new discord.MessageEmbed()
    .setDescription('🏓 Pinging...')
    .setColor("RED");

    const msg = await message.channel.send(msgembed)
    
    
    const embed = new discord.MessageEmbed()
    .setDescription(`Returns Latency And API Ping`)
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
    .addField("💓 API", `\`${client.ws.ping}ms\``)
    .addField("✏ Edit", `\`${Math.floor(msg.createdAt - message.createdAt)}ms\``)
    .setColor("GREEN")
    .setFooter(`Requested by ${message.author.username}`)
    
    await message.channel.send(embed)
    msg.delete();
  }
}