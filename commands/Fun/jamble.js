const Discord = require("discord.js")
const Jumble = require('jumble-words');

module.exports = {
  name: 'jumble',
  category: 'fun',
  description: 'Send a jumble',
  usage: 'none',

run: async (client, message, args) => {
    const jumble = new Jumble();
    const word = jumble.generate();
        const filter = m => m.author.id === message.author.id;

        await message.channel.send(`Your word is **${word[0].jumble}**!`);

        message.channel.awaitMessages(filter, {
            max: 1,
            error: ["time"],
            time: 15000
        })
        .then(collected => {
            const m = collected.first();
            if (m.content.toLowerCase() != word[0].word.toLowerCase()) return message.channel.send(`Your choice is incorrect!. Correct word was **${word[0].word}**!`);
            return message.channel.send(`Correct guess! The word was **${word[0].word}**`);

        })
        .catch(() => {
            message.channel.send(`You didn't answer in time. The correct word was **${word[0].word}**!`);


        })

    }
}