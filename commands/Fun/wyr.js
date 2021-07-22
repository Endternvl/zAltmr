const { wyr } = require('easyfunjs');

module.exports = {
  name: 'wouldyourather',
  description: 'Would you rather?',
  aliases: ['wyr'],

  run: async(client, message, args) => {
    await wyr(message)
  }
}