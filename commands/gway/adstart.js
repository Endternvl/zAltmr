const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: 'adstart',
  description: 'start a giveaway with advanced things!',

  run: async(client, message, args) => {
    const prefix = client.prefix;
    const currentGiveaways = client.giveawaysManager.giveaways.filter(
    g => g.guildID === message.guild.id && !g.ended
  ).length;
  let time = "";
  let winnersCount;
  let prize = "";
  let channel = "";
  let embed = new Discord.MessageEmbed()
    .setTitle("Create A Giveaway!")
    .setColor("#406da2")
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();
  const msg = await message.channel.send(
    embed.setDescription(
      "In which channel would you like the giveaway to start in?\nPlease tag the channel or provide it's ID.\n **Must Reply within 30 seconds!**"
    )
  )
  let xembed = new Discord.MessageEmbed()
    .setTitle("Time Out! 🕖")
    .setColor("#FF0000")
    .setDescription(`Ow Man! Your Time Was Out! You Don\'t Respond In **30 Seconds** So The Setup Was Canceled. To Create Again, Type \`${prefix}txtstart\``)
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()

  const filter = m => m.author.id === message.author.id && !m.author.bot
  const collector = await message.channel.createMessageCollector(filter, {
    max: 3,
    time: 30000
  })

  collector.on("collect", async collect => {

    const response = collect.content
    let chn =
      collect.mentions.channels.first() ||
      message.guild.channels.cache.get(response)
    await collect.delete()
    if (!chn) {
      return msg.edit(
        embed.setDescription(
          "Uh-Oh! Looks like you provided an Invalid channel!\n**Try Again?**\n Example: ``#prizes``, ``829523960940199947``"
        )
      )
    } else {
      channel = chn
      collector.stop(
        msg.edit(
          embed.setDescription(
            `Nice! Next, How long do you want me to host the giveaway in ${channel} for? \n** Must Reply within 30 seconds!**`
          )
        )
      );
    }
    const collector2 = await message.channel.createMessageCollector(filter, {
      max: 3,
      time: 30000
    });
    collector2.on("collect", async collect2 => {

      let mss = ms(collect2.content);
      await collect2.delete()
      if (!mss) {
        return msg.edit(
          embed.setDescription(
            "Aw Snap! Looks Like You Provided Me With An Invalid Duration\n**Try Again?**\n Example: ``10 minutes``,``10m``,``10``"
          )
        );
      } else {
        time = mss;
        collector2.stop(
          msg.edit(
            embed.setDescription(
              `EPIC! Next, How may winners should I roll for the giveaway?\n**Must Reply within 30 seconds.**`
            )
          )
        );
      }
      const collector3 = await message.channel.createMessageCollector(filter, {
        max: 3,
        time: 30000,
        errors: ['time']
      });
      collector3.on("collect", async collect3 => {


        const response3 = collect3.content.toLowerCase()
        await collect3.delete()
        if (parseInt(response3) < 1 || isNaN(parseInt(response3))) {
          return msg.edit(
            embed.setDescription(
              "Boi! Winners Must Be A Number or greater than equal to one!\n**Try Again!**"
            )
          );
        } else {
          winnersCount = parseInt(response3);
          collector3.stop(
            msg.edit(
              embed.setDescription(
                `Alright! Next, What should be the prize for the giveaway?\n**Must Reply within 30 seconds!**`
              )
            )
          );
        }
        const collector4 = await message.channel.createMessageCollector(
          filter,
          { max: 3, time: 30000 }
        );
        collector4.on("collect", async collect4 => {

          const response4 = collect4.content.toLowerCase();
          prize = response4;
          await collect4.delete()
          collector4.stop(
            msg.edit(
              embed.setDescription(
                "Good! Next, Do you want to have a server joining requirement for the giveaway? If yes, provide the server's permanent invite link!\nMust reply within 30s! else will be canceled.\nIf No, Respond With `nope`."
              )
            )
          );
          const collector5 = await message.channel.createMessageCollector(
            filter,
            { max: 1, time: 30000 }
          );
          collector5.on("collect", async collect5 => {
            const response5 = collect5.content;
            await collect5.delete()
            if (response5.toLowerCase() !== "nope") {
              client.fetchInvite(response5).then(async invite => {
                let client_is_in_server = client.guilds.cache.get(
                  invite.guild.id
                );
                if (!client_is_in_server) {
                  return message.channel.send({
                    embed: {
                      color: 000000,
                      author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                      },
                      title: "Server Check!",
                      url: "https://discord.gg/9R7hZtbnyw",
                      description:
                        "Hold Up, Wait A Minute?! I see a new server! Are you sure im on that server? if im not on the server, then it will not worked. ask owner to invite me!",
                      timestamp: new Date(),
                      footer: {
                        icon_url: client.user.avatarURL,
                        text: "Server Check"
                      }
                    }
                  });

                }

                collector5.stop(
                  msg.edit(
                    embed.setDescription(
                      `Alright! Giveaway has been started in ${channel} for **${prize}** which will last for **${ms(
                        time,
                        { long: true }
                      )}** and there will be **${winnersCount}** winner(s)! and users would have to join ${response5}`
                    )
                  )
                )
                client.giveawaysManager.start(channel, {
                  time: parseInt(time),
                  prize: prize,
                  hostedBy: client.config.hostedBy ? message.author : null,
                  winnerCount: parseInt(winnersCount),
                  messages: {
                    giveaway: "**Giveaway!**",
                    giveawayEnded: "**GIVEAWAY ENDED**",
                    timeRemaining: `**Time Remaining : {duration}**`,
                    inviteToParticipate: `**React with 🎉 to participate!**`,
                    winMessage: "Congratulations, {winners}! You won **{prize}**!",
                    embedFooter: "Giveaways",
                    hostedBy: "**Hosted By: {user}**",
                    noWinner:
                      "**Oh No!** No One Joined The Giveaway So The Giveaway Was Canceled.",
                    winners: "Lucky Winner(s) In This Giveaway",
                    endedAt: "Winners rolled at",
                    units: {
                      seconds: "seconds",
                      minutes: "minutes",
                      hours: "hours",
                      days: "days"
                    }
                  },
                  extraData: {
                    server: `${invite.guild.id}`
                  }
                })
              });
            } else {
              return message.channel.send(`**Please use the command \`\`${prefix}start\`\` instead of make a giveaway without a server requirement!**`)
            }
          });
        });
      });
    });
  });
  collector.on('end', (collected, reason) => {
    if (reason == 'time') {
      message.channel.send(xembed)
    }
  })
  try {
    collector2.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.channel.send(xembed)
      }
    });
    collector3.on('end', (collected, reason) => {
      if (reason == 'time') {
        message.channel.send(xembed)

      }
    })
    collector4.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.channel.send(xembed)
      }
    })
    collector5.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.channel.send(xembed)
      }
    })
  } catch (e) {

  }
  }
}