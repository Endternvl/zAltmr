const { DiscordBattleShip } = require('discord-battleship');
const BattleShip = new DiscordBattleShip({
    embedColor: "RANDOM", /* Any Discord.js Color Resolvable will work. */
    prefix: "b!", /* This is the prefix that will be used in the users DM's for commands. 
                    You can set this to any string. */
});

module.exports = {
  name: 'battleship',
  usage: '[USER TO BATTLE WITH]',
  category: 'games',
  description: 'play basic battleship board game using [discord-battleship](https://npmjs/package/discord-battleship)',

  run: async (client, message, args) => {
    if (message.mentions.users.first().bot) return message.reply("Bots Can't Play Games Like This!")
    console.log(`${message.author.username} just played battleship. so i guess errors are coming and nvm them!`)
    await BattleShip.createGame(message);
  }
}