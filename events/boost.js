const client = require('../index');
const prefix = client.prefix;
const db = require('../mongodels/boost');
const { MessageEmbed } = require('discord.js');

client.on('message', async message => {
  if (message.author.bot) return;
  if(!message.guild) return;


  db.findOne({ guild: message.guild.id }, async (err, data) => {
    if (message.type === 'USER_PREMIUM_GUILD_SUBSCRIPTION') {
      let ch = message.guild.channels.cache.get(data.channel)
      ch.send(`Thank you ${message.author}, for becoming a Nitro Booster!`)
    }
  });
});