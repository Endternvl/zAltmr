const giveMeAJoke = require('give-me-a-joke');

module.exports = {
  name: "dadjoke",
  category: "fun",
  description: "dad, give me a **JOKE**",
  usage: "dadjoke",

  run: async (client, message, args) => {
    giveMeAJoke.getRandomDadJoke(function(joke){
      message.react('<:Laughingcryingeyesopen:823758071322116098>')
      message.channel.send(joke);
    })
  }
}