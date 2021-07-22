const { default_prefix } = require('../../config.json')
const db = require('quick.db')
const random = require("easyfunjs").Img

module.exports = {
  name: "random",
  aliases: ["randomnum"],
  category: "fun",
  description: "Shows a Random Number",
  usage: "random <MIN. NUM> <MAX. NUM>",
  run: async (client, message, args) => {
    let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
  //command
  let min = args[0];
  if(!min) return message.reply(`Please include a minimum number! Usage: \`${prefix}random <MIN. NUM> <MAX. NUM>\``)
  let max = args[1];
  if(!max) return message.reply(`Please include a maximum number! Usage: \`${prefix}random <MIN. NUM> <MAX. NUM>\``)
  if(isNaN(min) || isNaN(max))return message.reply(`The Parameters MUST be Numbers! Usage: \`${prefix}random <MIN. NUM> <MAX. NUM>\``)
  message.channel.send(`\`\`\`fix\n${getRandomInt(Number(min), Number(max))}\n\`\`\``)  
  }
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}