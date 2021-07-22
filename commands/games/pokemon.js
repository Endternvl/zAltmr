const { MessageEmbed } = require("discord.js");
const { Spawn } = require("pokecord");

module.exports = {
  name: "pokemon",
  category: "games",
  description: "Guess the pokemon!",
  usage: "sz!pokemon",
  run: async (client, message, args) => {

    const pokemon = await Spawn().catch(e => {});
    if (!pokemon) return message.channel.send("OOP! WHAT IS HAPPENING? SOMETHING WENT WRONG");
    const filter = m => m.author.id === message.author.id;

    const embed = new MessageEmbed()
        .setAuthor("Guess The Pokémon")
        .setColor("#E15D44")
        .setImage(pokemon.imageURL);
    
    await message.channel.send(embed);

    message.channel.awaitMessages(filter, {
        max: 1,
        error: ["time"],
        time: 10000
    })
    .then(collected => {
        const m = collected.first();
        if (!m.content || m.content.toLowerCase() !== pokemon.name.toLowerCase()) return message.channel.send(`<a:WrongCheck:819048042091118604> Incorrect guess! The answer was **${pokemon.name}**.`);
        return message.channel.send(`<a:YesCheck:819048011840618526> **CORRECT ANSWER!**`);
    })
    .catch(() => {
        message.channel.send(`<a:WrongCheck:819048042091118604> You did not answer in time. The pokemon name is **${pokemon.name}**!`);
    });

}
};