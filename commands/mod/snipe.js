const { Message, Client, MessageEmbed } = require('discord.js');
const moment = require('moment')

module.exports = {
  name: 'snipe',
  description: '🔫 Snipe a deleted message on this channel!',
  aliases: ['deletedmessages'],

  run: async(client, message, args) => {
    const snipes = client.snipe.get(message.channel);
    if(!snipes) return message.channel.send('There are no deleted message on this channel sadly');

    const snipe = +args[0] - 1 || 0;
    const target = snipes[snipe];
    if(!target) return message.reply(`There is only ${snipes.length} messages!`);

    const { msg, time, image } = target;
    message.channel.send(new MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setImage(image)
    .setDescription(msg.content)
    .setFooter(`${moment(time).fromNow()} | ${snipe + 1} / ${snipes.length}`)
    .setColor('RANDOM'));
  },
};