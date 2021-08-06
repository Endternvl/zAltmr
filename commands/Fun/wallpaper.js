const hdqwalls = require("hdqwalls-wrapper")
const Discord = require('discord.js')

module.exports = {

    name:'wallpaper',
    description:'Send a wallpaper to you!',
    args: true,
    usage: '[query]',


    run: async (message, args,client) => {

        const image = await hdqwalls(query);


        const embed = new Discord.MessageEmbed()
            .setTitle('Founded Your Query!')
            .setColor("RANDOM")
            .setImage(image[0]);

        message.channel.send(embed)
        


    }
}