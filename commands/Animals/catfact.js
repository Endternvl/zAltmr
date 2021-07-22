const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'catfacts',
  aliases: [ 'catfact', 'neko', 'cf' ],
  group: 'fun',
  description: 'Generate a random useless cat facts',
  clientPermissions: [ 'EMBED_LINKS' ],
  examples: [
    'catfacts',
    'catfact',
    'neko',
    'cf'
  ],
  run: async (client, message) => {

    const data = await fetch('https://catfact.ninja/facts')
    .then(res => res.json())
    .catch(() => null);

    if (!data){
      return message.channel.send(`Server Error 5xx: Catfact API is currently down!`);
    };

    return message.channel.send(
      new MessageEmbed()
      .setThumbnail('https://media3.giphy.com/media/WSsDlA79uBg1Txm4Bu/giphy.gif')
      .setColor('RANDOM')
      .setDescription(data.data[0].fact)
      .setFooter(`Catfact | \©️${new Date().getFullYear()} ${client.user.username}`)
    );
  }
};