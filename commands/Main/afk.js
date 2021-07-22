const { Client, Message, MessageEmbed } = require('discord.js');
const { afk } = require('../../Collection')
const sendDone = require('../../mores/success');

module.exports = {
  name: "afk",
  description: "If you're away from computer, use AFK command!",
  
  run: async (client, message, args) => {
    const reason = args.join(" ") || 'No Reason';

    afk.set(message.author.id, [ Date.now(), reason ]);

    sendDone(`You're Now AFK - ${reason}`, message.channel)
  },
};