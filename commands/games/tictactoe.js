module.exports = {
  name: 'tictactoe',
  description: 'lets go play tic tac toe!',

  run: async (client, message, args) => {
    const { TicTacToe } = require('easyfunjs');
    const opponent = message.mentions.users.first();
    if (!opponent) return message.channel.send(`Please mention who you want to challenge at tictactoe.`);
    const botuser = message.mentions.users.first().bot;
    if(botuser) return message.reply('You cant play with bots!')
    const game = new TicTacToe({
    message: message,
    opponent: opponent, //opponent
    xColor: 'red', //x's color
    oColor: 'blurple', //zero's color
    xEmoji: '❌',  //the x emoji
    oEmoji: '0️⃣' ,//the zero emoji
})
game.start().catch((err) => {
  return undefined;
})
  }
}