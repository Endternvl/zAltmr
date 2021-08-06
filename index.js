
console.log('-------- Loading Packages --------');
const discord = require('discord.js');
const client = new discord.Client({
    disableMention: 'everyone',
    shards: 'auto',
    restTimeOffset: 0,
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
});
let Translator = require("./translator.js");
Translator = new Translator();
const { token, default_prefix, mongoDBURL } = require("./config.json");
require('discord-reply')
const { version } = require('./package.json');
const { version: discordjsVersion } = require('discord.js');
const { CanvasSenpai } = require('canvas-senpai')
const { MessageButton, MessageActionRow } = require('discord-buttons')
const disbut = require('discord-buttons')
disbut(client)
const db = require("quick.db");
require('./util/reply');
const { GiveawaysManager } = require("discord-giveaways");
const mongoose = require('mongoose');
mongoose.connect(mongoDBURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(console.log('--- M O N G O  C O N N E C T E D ---'));
const { Database } = require('quickmongo');
const YoutubePoster = require("discord-yt-poster");
const premiumGuildSchema = require('./mongodels/premium-guild');
const sendError = require('./mores/error');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');
module.exports = client;
let {
  awaitReply,
  resolveUser,
  getRandomString,
  send,
  emo,
  text,
  randomNumber,
  formating, emoji,
  translate
} = require("./Functions");
console.log('--- Packages and events loaded successfully ---');
//---------Making Collections---------\\
console.log('--- LOADING COLLECTIONS ---');
client.count = emo;
client.EEmoji = emoji;
client.resolveUser = resolveUser;
client.random = getRandomString;
client.send = send;
client.text = text;
client.format = formating;
client.translate = translate;
client.commands = new discord.Collection();
client.slashCommands = new discord.Collection();
client.aliases = new discord.Collection();
client.db = require('quick.db')
const cooldowns = new discord.Collection();
client.queue = new Map();
client.vote = new Map();
client.awaitReply = awaitReply;
client.chatbots = new Database(mongoDBURL) //you can use mongoDBURL also. i used this one because of i want chatbot mongo and basic mongo.
client.data = new Database(mongoDBURL);
client.data2 = client.data;
client.emotes = require('./emotes.json');
client.filters = require('./filters.json');
client.token = require('./config.json').token;
client.config = require('./config.json');
client.snipe = new discord.Collection();
client.YTP = new YoutubePoster(client);
//---end of collections---\\
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});


//--------Started--------\\
console.log('--- STARTING ---')
client.on("message", async message => {

  if (message.author.bot) return;
  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;
  client.prefix = prefix;
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    const pingedembed = new discord.MessageEmbed()
      .setTitle('Hello!')
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setImage("https://cdn.discordapp.com/attachments/811143476522909718/861430392158552094/standard_6.gif")
      .setDescription(`Hello! I'm ${client.user.username}, A Multipurposed Bot, Created By <@787842689969684480> My Prefix In The Server Is \`${prefix}/mention\` Searching For My Commands? Try To Do \`${prefix}help\``)
      .setColor("RANDOM");
    return message.reply(pingedembed);
  }
  let daprefix;

  let mentionRegex = message.content.match(new RegExp(`^<@!?(${client.user.id})>`, 'gi'))

  if (mentionRegex) {
    daprefix = `${mentionRegex[0]}`
  } else {
    daprefix = prefix;
  }

  if (!message.content.toLowerCase().startsWith(daprefix)) return;

  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(daprefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;


  let cmdx = db.get(`cmd_${message.guild.id}`)

  if (cmdx) {
    let cmdy = cmdx.find(x => x.name === cmd)
    if (cmdy) message.channel.send(cmdy.responce)
  }

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  

  if (command) {
    if (command.args && !args.length) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .setDescription(
            `Arguments maybe forgotten, ${
            message.author
            }!\nThe proper usage would be: \n\`\`\`html\n${command.usage ||
            "No Usage Actually"}\n\`\`\`Description:\`\`\`html\n${command.description ||
            "No Description"}\n\`\`\``
          )
	  .setFooter(`© zAltmr`)
      );
    }
    if (command.bot) {
      let neededPerms = [];

      command.bot.forEach(p => {
        if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`");
      });

      if (neededPerms.length)
        return message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `I need **${neededPerms.join(
                ", "
              )}** permission(s) to execute the command!`
            )
	    .setFooter(`© zAltmr`)
        );
    }

    if (command.author) {
      const authorPerms = message.channel.permissionsFor(message.author);
      if (!authorPerms || !authorPerms.has(command.author || "ADMINISTRATOR")) {
        return message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `You do not have permission to use this command.\nThis command requires \`${command.author}\``
            )
	    .setFooter(`© zAltmr`)
        );
      }
    }
    if (command.botpermission) {
      let neededPerms = [];

      command.botpermission.forEach(p => {
        if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`");
      });

      if (neededPerms.length)
        return message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `I need **${neededPerms.join(
                ", "
              )}** permission(s) to execute the command!`
            )
	    .setFooter(`© zAltmr`)
        );
    }

    if (command.permissions || command.permission) {
      const authorPerms = message.channel.permissionsFor(message.author);
      if (
        !authorPerms ||
        !authorPerms.has(command.permissions || "ADMINISTRATOR")
      ) {
        return message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `You do not have permission to use this command.\nThis command requires \`${command.permissions.join(
                ", "
              ) || "ADMINISTRATOR"}\``
            ).setFooter(`© zAltmr`)
        );
      }
    }

    if (command.guildOnly && message.channel.type === "dm") {
      return sendError("Uh, I can't execute that command inside DMs!", message.author);
    }
    //if(command.premium && !(await premiumSchema.findOne({ User: message.author.id })))return sendError('You can\'t access this commmand because this is a premium only command!', message.channel);
    if (command.premium) {
      premiumGuildSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) {
          return sendError('This guild or you dont have a premium acces to this command!', message.channel)
        }
        if (!data.Permanent && Date.now() > data.Expire) {
          data.delete();
          return sendError('Premium System Is Now Expire!', message.channel)
        }
      })
    };
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        const cooldowntitle = ["Slow Down Buddy!",
          "Hey! Calm Down!",
          "Eh, Bro!",
          "Chill Man!",
          "Eh? Ohh",
          "Boom!",
          "Yikes!",
          "Get Cooldown Rolled!",
          "Oopsie!"]
        return message.channel.send(
          new MessageEmbed()
            .setTitle(`${cooldowntitle[Math.floor(Math.random() * cooldowntitle.length)]}`)
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `Chill sweetie, you can use the command again on **${ms(
                timeLeft
              )}**`
            )
            .setFooter(`© zAltmr`)
        );
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    try {
      if (command) {
        command.run(client, message, args);
      }
    } catch (error) {
      const errrr = new MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setDescription(
          `**YUCK!** Something went wrong executing that command\nError Message: \`${
          error.message ? error.message : error
          }\``
        )
	.setFooter(`© zAltmr`);
      return message.channel
        .send(errrr)
        .then(m => m.delete({ timeout: 13000 }).catch(() => { }));
    }
  }
});

//---------Anti-Alt---------\\
const alt = require("discord-anti-alt")
client.on('guildMemberAdd', async member => {
    const altdays = db.get(`altdays.${member.guild.id}`)
    const altchannel = db.get(`antialt.${member.guild.id}`)
    if(!altdays || !altchannel)return;



    const account = new alt.config({
        days:parseInt(altdays),
        options:'kick'
    })

    let running = account.run(member);
    let profile = alt.profile(member);
    if(running) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag,member.user.displayAvatarURL({ dynamic: true }))
        .setColor("RANDOM")
        .addField("Account's Age: ",profile.userAge,true)
        .addField("Minimum Age required: ",altdays,true)
        .addField("Account was created at: ",profile.date.userDateCreated,true)
	.setFooter('Alt Check System')
        return member.guild.channels.cache.get(altchannel).send(embed)
    }
});
//---------when bot joined to a server---------\\
client.on("guildCreate", guild => {
  guild.fetchAuditLogs({ type: "BOT_ADD", limit: 1 }).then(log => {
    const inviter = log.entries.first().executor;
    var chx = guild.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0)
    const thankEmbed = new discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Hello!')
      .setDescription(`Woah! Thank You So Much, <@${inviter.id}> For Inviting Me To This Awesome Server (${guild.name})`)
      .setImage('https://cdn.discordapp.com/attachments/811143476522909718/861430392158552094/standard_6.gif')
      .setTimestamp();

    chx.send(thankEmbed).catch(() => undefined);
  });
});

client.giveawaysManager = new GiveawaysManager(client, {
  updateCountdownEvery: 3000,
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    reaction: "🎉"
  }
});
client.giveawaysManager.on(
  "giveawayReactionAdded",
  async (giveaway, reactor, messageReaction) => {
    if (reactor.user.bot) return;
    try {
      if (giveaway.extraData) {
        await client.guilds.cache.get(giveaway.extraData.server).members.fetch(reactor.id)
      }
      reactor.send(
        new discord.MessageEmbed()
          .setTimestamp()
          .setTitle("Entery Approved!")
          .setDescription(
            `Your have entery to [This Giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been approved! Goodluck winning!`
          )
          .setColor('GREEN')
          .setFooter()
          .setTimestamp()
      );
    } catch (error) {
      const guildx = client.guilds.cache.get(giveaway.extraData.server);
      messageReaction.users.remove(reactor.user);
      reactor.send(new discord.MessageEmbed()
        .setTimestamp()
        .setTitle(":x: Entery Denied!")
        .setDescription(
          `Your entery to [This Giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been denied as you did not join **${guildx.name}**`
        )
        .setColor('RED')
        .setFooter()
      );
    }
  }
);
client.giveawaysManager.on('endedGiveawayReactionAdded', (giveaway, member, reaction) => {
  reaction.users.remove(member.user);
  member.send(new discord.MessageEmbed()
    .setTitle(`⚠ Uh Oh!`)
    .setDescription('You Can\'t Enter This Giveaway Because The Giveaway Was Ended!')
    .setColor('RED')
    .setTimestamp())

});
client.giveawaysManager.on('giveawayEnded', (giveaway, winners) => {
  winners.forEach((member) => {
    member.send(new discord.MessageEmbed()
      .setTitle(`🎁 Let's goo!`)
      .setDescription(`Hello there ${member.user}\n I heard that you have won **[[This Giveaway]](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})**\n DM The Host To Claim Your Prize!`)
      .setTimestamp()
      .setColor('RED')
      .setFooter(member.user.username, member.user.displayAvatarURL())
    );
  });
});
client.giveawaysManager.on('giveawayRerolled', (giveaway, winners) => {
  winners.forEach((member) => {
    member.send(new discord.MessageEmbed()
      .setTitle(`🎁 GGs! We Have A New Winner`)
      .setDescription(`Hello there ${member.user}\n I heard that the host rerolled and you have won **[[This Giveaway]](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})**\n DM The Host To Claim Your Prize!`)
      .setColor('RED')
      .setTimestamp()
      .setFooter(member.user.username, member.user.displayAvatarURL())
    );
  });
});

//---end---\\

//---nqn
client.on("message", async (message) => {
  if (message.author.bot) return;
  let msg = message.content;

  let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g)
  if (!emojis) return;
  emojis.forEach(m => {
    let emoji = client.emojis.cache.find(x => x.name === m)
    if (!emoji) return;
    let temp = emoji.toString()
    if (new RegExp(temp, "g").test(msg)) msg = msg.replace(new RegExp(temp, "g"), emoji.toString())
    else msg = msg.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
  })

  if (msg === message.content) return;

  let webhook = await message.channel.fetchWebhooks();
  let number = randomNumber(1, 2);
  webhook = webhook.find(x => x.name === "zAltmr" + number);

  if (!webhook) {
    webhook = await message.channel.createWebhook(`zAltmr` + number, {
      avatar: client.user.displayAvatarURL({ dynamic: true })
    });
  }

  await webhook.edit({
    name: message.member.nickname ? message.member.nickname : message.author.username,
    avatar: message.author.displayAvatarURL({ dynamic: true })
  })

  message.delete().catch(() => { })
  webhook.send(msg).catch(() => { })

  await webhook.edit({
    name: `zAltmr` + number,
    avatar: client.user.displayAvatarURL({ dynamic: true })
  })


});
client.on('clickButton', button => {
    Nuggies.buttonroles.buttonclick(client, button);
});




client.on("ready", () => {
  client.user.setStatus("online");
  console.log(`Need some help? https://discord.gg/9R7hZtbnyw`)
});

//---------Here To Set The Activity Status---------\\
client.on("ready", async () => {
  console.log(`Powered By zAltmr ${version} and DISCORDJS ${discordjsVersion}`)
  const status = [
    `in ${client.guilds.cache.size} Servers | ${client.user.username}`,
    `with ${client.users.cache.size} Users | ${client.user.username}`,
    `in ${client.channels.cache.size} Channels | ${client.user.username}`,
    `${default_prefix}help | ${client.user.username}`,
  ]
  setInterval(() => {
    client.user.setActivity(status[Math.floor(Math.random() * status.length)], { type: "PLAYING" })
  }, 3000)
});
//---------End--------\\
client.login(token).catch(() => {
  console.log("--- Invalid Token Or You're Not Putting The Token In Your Config.json ---")
});