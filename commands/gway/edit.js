const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db')
const sendError = require('../../mores/error')
const { default_prefix } = require('../../config.json')

module.exports = {
  name: 'edit',
  description: 'edit a giveaway',

  run: async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return sendError('You Don\'t Have Enough Permission To Use This Command! Missing Permission: `MANAGE_MESSAGES`')
    const prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = default_prefix;
    let time = "";
  let winnersCount;
  let prize = "";
  let giveawayx = "";
  let embed = new Discord.MessageEmbed()
    .setTitle("Edit A Giveaway!")
    .setColor("#406da2")
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();
  const msg = await message.channel.send(
    embed.setDescription(
      "Which Giveaway Would You Like To Edit?\nProvide The Giveaway Message's ID\n **Must Reply within 30 seconds!**"
    )
  );
  let xembed = new Discord.MessageEmbed()
    .setTitle("Time Out! 🕖")
    .setColor("#FF0000")
    .setDescription(`Ow Man! Your Time Was Out! You Don\'t Respond In **30 Seconds** So The Setup Was Canceled. To Create Again, Type \`${prefix}edit\``)
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()

  const filter = m => m.author.id === message.author.id && !m.author.bot;
  const collector = await message.channel.createMessageCollector(filter, {
    max: 3,
    time: 30000
  });

  collector.on("collect", async collect => {

    const response = collect.content;
    let gid = BigInt(response).toString()
     await collect.delete()
    if (!gid) {
      return msg.edit(
        embed.setDescription(
          "Uh-Oh! Looks like you provided an Invalid Message ID!\n**Try Again?**\n Example: ``677813783523098627``"
        )
      );
    } else {
      collector.stop(
        msg.edit(
          embed.setDescription(
            `Alright! Next, What Would be our new time for the giveaway to be ended \n** Must Reply within 30 seconds!**`
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
            "Aw Snap! Looks Like You Provided Me With An Invalid Duration\n**Try Again**"
          )
        );
      } else {
        time = mss;
        collector2.stop(
          msg.edit(
            embed.setDescription(
              `EPIC! Next, How may winners should I roll for the giveaway now?\n**Must Reply within 30 seconds.**`
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

        const response3 = collect3.content.toLowerCase();
        await collect3.delete()
        if (parseInt(response3) < 1 || isNaN(parseInt(response3))) {
          return msg.edit(
            embed.setDescription(
              "Eh! Winners Must Be A Number or greater than equal to one!\n**Try Again**"
            )
          );
        } else {
          winnersCount = parseInt(response3);
          collector3.stop(
            msg.edit(
              embed.setDescription(
                `Alright! Next, What should be the new prize for the giveaway?\n**Must Reply within 30 seconds!**`
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
console.log(giveawayx),
            msg.edit(
              embed.setDescription(
                `Edited`
              )
            )
          );
          client.giveawaysManager.edit(gid, {
            newWinnersCount: winnersCount,
            newPrize: prize,
            addTime: time
          })
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
  } catch (e) {}
  }
}