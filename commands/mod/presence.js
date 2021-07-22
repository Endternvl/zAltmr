const {
    MessageEmbed,
    Collection,
    Client,
    Message
} = require('discord.js');

const db = require("../../mongodels/pres.js");
const sendError = require('../../mores/error')


module.exports = {
    name: 'setpresencemessage',
    aliases: ["spm"],
    description: 'Set the message that the user wants to set to get a role!',

    run: async (client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) return sendError('You do not have admin perms to use this command!', message.channel);

        const choices = ["set", "delete", "open"];
        const choice = args[0];
        if (!choices.includes(choice)) return sendError('Invalid Option! Valid Options: `set, delete, open`', message.channel);

        switch (choice) {
            case ('set'): {
                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
                if (!role) return sendError('Please provide a valid role!', message.channel);

                let cont = args.slice(2).join(" ");
                if (!cont) return sendError('Please provide the content for the verfication message!', message.channel);
                if (cont.lenght > 20) return sendError('The content provided can not be above 20 characters!', message.channel);

                db.findOne({
                    guild: message.guild.id
                }, async (err, data) => {
                    if (!data) {
                        data = new db({
                            guild: message.guild.id,
                            content: {
                                descrip: cont,
                                role: role.id,
                            }
                        }).save();

                        return message.channel.send('The presence message was set!');
                    } else {
                        await db.findOneAndDelete({
                            guild: message.guild.id
                        });
                        data = new db({
                            guild: message.guild.id,
                            content: {
                                descrip: cont,
                                role: role.id,
                            }
                        }).save()
                        return message.channel.send('The presence message was updated!!');
                    }
                })
                break;
            }

            case ('delete'): {
                await db.findOneAndDelete({
                    guild: message.guild.id
                });
                message.channel.send('The presence message has been deleted!');
                break;
            }

            case ('open'): {
                await db.findOne({
                    guild: message.guild.id
                }, async (err, data) => {
                    if (!data) return sendError('The presence message was not set!', message.channel);

                    await message.channel.send(new MessageEmbed()
                        .setTitle('Presence Status Checker!')
                        .setDescription(`Change your status to: **${data.content.descrip.toLowerCase()}** to get role!`).setColor("BLUE")
                    )
                })
                break;
            }
        }
    }
}