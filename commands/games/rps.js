const discord = require('discord.js')
const colors = "RANDOM"; 
const sendError = require('../../mores/error');
module.exports = {
    name: "rps",
    description: "Play a game of Rock, Paper, Scissors",
  category: "Fun",
    run: async(client, message, args) => {
        const opponent = message.mentions.users.first();
        if (message.mentions.users.first().bot) return message.reply("Bots Can't Play Games Like This!")
if(!opponent) return sendError(`Please mention who you want to fight`, message.channel);
const { RPS } = require('rayzdev')
const game = new RPS({
    message: message,
    opponent: opponent, // NOT CHANGEABLE
    challenger: message.author, // NOT CHANGEABLE
    acceptMessage: "Hey <@" + opponent + "> Do you want to play rock paper scissors with <@" + message.author + ">",
})
game.start().catch((err) => {
  return undefined;
})
}
}