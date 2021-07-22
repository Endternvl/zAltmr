const Discord = require('discord.js');

module.exports = {
    name: 'impostor',
    permissions: [],
    description: 'EJECT THE [IMPOSTOR](https://among.us/)',
    category: 'fun',

    run: async(client, message, args) => {

      const impostor = message.mentions.members.first();
      if(!impostor) {
        return message.reply('who is the impostor... ples mention someone!')
      }

      if(impostor === message.guild.owner.id){
        return message.reply("You cant eject the owner of the server!")
      }
        const ejop = [
            `${impostor} was the impostor!`,
            `${impostor} was not the impostor!`,
            `${impostor} has been ejected. 2 Impostors remain.`,
            `${impostor} has been ejected. 1 Impostor remains.`,
            `${impostor} has been ejected. 0 Impostors remain.`,
        ]

        const rau = Math.floor(Math.random() * ejop.length);
        
        await message.delete().then(() => {
            message.channel.send(ejop[rau]);
        })
    }
}