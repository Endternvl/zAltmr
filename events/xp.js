const client = require('../index');
let Discord = require("discord.js");
let Levels = require("discord-xp");
let { mongoDBURL } = require("../config.json");
const canvacord = require("canvacord");
  Levels.setURL(mongoDBURL); //can be putten in .env too and then imported//Add this to your main file (example: index.js or main.js)
  client.on("message", async message => {
    if (message.author.bot === true) return;
    const randomXp = Math.floor(Math.random() * 34) + 1;
    const hasLeveledUp = await Levels.appendXp(
      message.author.id,
      message.guild.id,
      randomXp
    );
    if (hasLeveledUp) {
      const User = await Levels.fetch(message.author.id, message.guild.id);
      let channel_id = await client.data.get(`levelch_${message.guild.id}`);
      if (channel_id === null)
        return message.reply(new Discord.MessageEmbed()
        .setDescription(`<a:trophy:861974032051208232> GGs! You Have Leveled Up To Level **${User.level}**`)
        .setColor('RANDOM'));

      let image = await client.data.get(`levelimg_${message.guild.id}`);
      let user = message.author;
      let levelchannel = client.channels.cache.get(channel_id);
      const neededXp = Levels.xpFor(parseInt(User.level) + 1);

      const ran = new canvacord.Rank()
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: "png" }))
        .setCurrentXP(User.xp)
        .setRequiredXP(neededXp)
        .setLevel(User.level)
        .setRank(0, "a", false)
        .setStatus(user.presence.status, true, 5)
        .setProgressBar("#00FFFF", "COLOR")
        .setUsername(user.username, "#1FF768")
        .setDiscriminator(user.discriminator)
        .setBackground(
          "IMAGE",image||
          "https://cdn.discordapp.com/attachments/811143476522909718/848760536362778634/zAltmrWelcome.png"
        );
        const clmessage = client.data.get(`levelmsg_${message.guild.id}`);
      ran.build().then(data => {
        const attachment = new Discord.MessageAttachment(data, "Rankcard.png");
        const EmbedLevel = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(message.guild.iconURL() + 'Level Up Logs')
          .setTimestamp()
          .setDescription(
            `Congratulations, ${user.username}! You just leveled up!\n
            **Information**\n
            User: ${user.username}\n
            Level: ${User.level}\n
            XP: ${User.xp}/${neededXp}`
          )
          .setImage("attachment://Rankcard.png")
          .attachFiles(attachment);

        levelchannel.send(EmbedLevel);
      
  })}});