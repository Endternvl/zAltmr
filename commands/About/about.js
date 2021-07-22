const db = require("quick.db");
const Discord = require ("discord.js")
const { version } = require('../../package.json');
const ms = require('pretty-ms');
const { version: discordjsVersion } = require('discord.js');

module.exports = {
  name: 'about',
  usage: '',
  aliases: ['aboutbot'],
  description: `About zAltmr`,

  run: async (client, message, args) => {
    message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`zAltmr v${version}`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addField('💭 Prefix', `\`${client.prefix}\``, true)
            .addField('🕕 Uptime', `\`${ms(client.uptime)}\``, true)
            .addField('🤖 Ping', `\`${client.ws.ping}ms\``, true)
            .addField('💾 Memory', `\`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap\``, true)
            .addField('🏠 Guild Count', `\`${client.guilds.cache.size}\` guilds`, true)
            .addField('💬 Commands', `\`${client.commands.size}\` cmds`,true)
            .addField('💻 Node', `\`${process.version} on ${process.platform} ${process.arch}\``, true)
            .addField('💾 Cached Data', `\`${client.users.cache.size} users\n${client.emojis.cache.size} emojis\``, true)
            .addField('💻 Discord.js', `\`${discordjsVersion}\``, true)
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        );
  }
}