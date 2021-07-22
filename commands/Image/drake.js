const Discord = require('discord.js');
const config = require('../../config.json');
const fetch = require('node-fetch')
module.exports = {
name: 'drake',
description: 'drake meme maker',
usage: '$drake <text1>, <text2>',
permissions: ['SEND_MESSAGES'],
    run: async (client, message, args) => {
      if(!args[0]){
        return message.reply('please define the thing!')
      }

        const split = args.join(" ").split(",")
        const user = split[0];
        const user2 = split[1]
        const res = await fetch(`https://frenchnoodles.xyz/api/endpoints/drake/?text1=${user}&text2=${user2}`, {

        });
        let Image = await res.buffer();
        const drakememe = new Discord.MessageAttachment(Image);
        message.channel.send(drakememe);

    }
}