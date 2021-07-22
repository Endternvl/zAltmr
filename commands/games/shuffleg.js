module.exports = {
  name: "shuffle-guess",
  aliases: ["guess"],
  usage: "guess",
  description: "Shuffle Guess Time!",
  category: "games",
  run: async (client, message, args) => {
    const fetch = require('node-fetch');
    const { version } = require('../../package.json')
    const { MessageEmbed } = require('discord.js');
    const randomWords = require('random-words');
    const word = randomWords()
    const res = await (await (fetch(`https://api.monkedev.com/fun/shuffle?content=${word}&key=EjLY54Vys5kJVWgcfaA1RjFIp`))).json();
    const firstbd = new MessageEmbed()
      .setTitle("Shuffled!")
      .setDescription("Now Try To Guess It!")
      .addField("Reflushed", `it is \`${res.result}\`\nOptions: \`cancel\`,\`reshuffle\``)
      .setColor("RANDOM");
    await message.channel.send(firstbd)
    const gameFilter = m => m.author.id
    const gameCollector = message.channel.createMessageCollector(gameFilter);

    gameCollector.on('collect', async msg => {
      const ggembed = new MessageEmbed()
        .setTitle("Nice!")
        .setDescription(`You're answer is right! it was \`${word}\``)
        .setColor("#C3447A")
        .setFooter(`© ${client.user.username} v${version}`);
      if (msg.author.bot) return
      const selection = msg.content.toLowerCase();
      if (selection === word) {
        message.channel.send(ggembed)
        gameCollector.stop()
      } else if (selection === 'cancel') {
        const cancelbd = new MessageEmbed()
          .setTitle("Game Stopped!")
          .setColor("RED");
        message.channel.send(cancelbd)
        gameCollector.stop();
      } else if (selection === 'reshuffle') {
        const reshbd = new MessageEmbed()
          .setTitle("Shuffled!")
          .setDescription("Now Try To Guess It **AGAIN!** don't make the same mistake...")
          .addField("Reflushed", `it is \`${res.result}\`\nOptions: \`cancel\`,\`reshuffle\``)
          .setColor("RANDOM");
        const ress = await (await (fetch(`https://api.monkedev.com/fun/shuffle?content=${word}&key=EjLY54Vys5kJVWgcfaA1RjFIp`))).json();
        message.channel.send(reshbd)
      } else if (selection !== word) {
        message.reply(`Wrong\nOptions: \`cancel\`,\`reshuffle\``)
      }
    });
  }
}