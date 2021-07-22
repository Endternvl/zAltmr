const db = require("quick.db");
const successs = require("../../mores/success")

module.exports = {
  name: "warns",
  description: "Get the warnings of yours or mentioned person",
  category: "moderation",
  run: (client, message, args) => {
    const user = message.mentions.members.first() || message.author;

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) warnings = 0;

    if(warnings < 1) return successs(`${user} have **${warnings}** warning`, message.channel)

    if(warnings > 1) return successs(`${user} have **${warnings}** warnings`, message.channel)
    return;
  }
};