const { readdirSync } = require("fs");
const fs = require('fs')
const ascii = require("ascii-table");

// Create a new Ascii table
let table = new ascii("Commands");
table.setHeading("Command", "Status");
module.exports = (client) => {
  // Read every commands subfolder
  readdirSync(__dirname.replace("\handlers", "\commands")).forEach(dir => {
    // Filter so we only have .js command files
    const commands = readdirSync(`${__dirname.replace("\handlers", "\commands")}/${dir}/`).filter(file => file.endsWith(".js"));

    // Loop over the commands, and add all of them to a collection
    // If there's no name found, prevent it from returning an error,
    // By using a cross in the table we made.
    for (let file of commands) {
      let pull = require(`${__dirname.replace("\handlers", "\commands")}/${dir}/${file}`);

      if (pull.name) {
        client.commands.set(pull.name, pull);
        table.addRow(file, '✅');
      } else {
        table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
        continue;
      }

      // If there's an aliases key, read the aliases.
      if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
    }
  });
  // Log the table
  console.log(table.toString());

  //--event handlers
  fs.readdirSync('./events/').forEach(file => {
    const events = fs.readdirSync('./events/').filter(file => file.endsWith(".js"));

    for (let files of events) {
      let get = require(`../events/${files}`);

      if (get.name) {
        client.events.set(get.name, get)
      } else {
        continue;
      }
    }
  })
}