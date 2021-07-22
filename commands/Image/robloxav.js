const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
const sendError = require('../../mores/error');

module.exports = {
  name: 'robloxav',
  description: 'send a avatar of a defined user',
  usage: '[ROBLOXUSERNAME]',
  run: async (client, message, args) => {
   let saybot = args.join('_');
        const url = `https://api.roblox.com/users/get-by-username?username=${saybot}`;
        snekfetch.get(url).then(result => {
              const data = result.body.Id;
              if (saybot.length < 1) return sendError("**Need to provide a username to use this command**", message.channel)
              if (result.body.Id === "undefined") return sendError(`**Couldn't find a roblox user by the name of \`${saybot}\`**`, message.channel)
              if(saybot.length > 30) return sendError('Have you ever played roblox? roblox max name length is 30!', message.channel)
              const url2 = `https://api.roblox.com/ownership/hasasset?userId=${data}&assetId=102611803`;
              snekfetch.get(url2).then(a => {
                const Verifiedcheck = a.body
                  const embed = new Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setTitle(saybot + "'s Avatar")
                  .setImage("http://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&Format=Png&username=" + saybot);
                  message.channel.send({embed}).catch(console.error);
                })
            }) 
    }
}