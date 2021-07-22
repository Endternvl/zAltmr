module.exports = {
  name: 'tictactoe',
  description: 'lets go play tic tac toe!',

  run: async (client, message, args) => {
    const { TicTacToe } = require('famjenotmine');
    const opponent = message.mentions.users.first();
    if (!opponent) return message.channel.send(`Please mention who you want to challenge at tictactoe.`);
    if(message.mentions.members.first().bot){
      return message.reply('You cant play with dbots!')
    }
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