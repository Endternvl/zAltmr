const { Client, Message } = require('discord.js');
const { snek } = require('famjenotmine')
module.exports = {
    name: 'snek',
    category: 'games',
    description: 'lets play snake game!',
    usage: 'snek',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      const gane = new snek({
    message: message,
    embed: {
    title: 'Snek Game', //embed title
    color: "#gt4668", //embed color
    gameOverTitle: "The Game Is Over", //game over embed title
    },
    emojis: {
      empty: '⬛', //zone emoji
      snakeBody: '🟩', //snake
      food: '🍎', //food emoji
      //control
      up: '⬆️', 
      right: '⬅️',
      down: '⬇️',
      left: '➡️',
      },
    })

    gane.start().catch((err) => {
  return undefined;
})
    }
};