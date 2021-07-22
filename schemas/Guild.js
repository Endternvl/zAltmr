const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { default_prefix } = require('../../config.json');

const guildsDB = new Schema({
	id: String,
	prefix: {
		type: String,
		default: default_prefix,
	},
	registeredAt: {
		type: Number,
		default: Date.now(),
	},
	chatbot_enabled: {
		type: Boolean,
		default: false,
	},
	chatbot_channel: {
		type: String,
		default: 'null',
	},
	automeme_enabled: {
		type: Boolean,
		default: false,
	},
	automeme_channel: {
		type: String,
		default: 'null',
	},
	mute_role: {
		type: String,
		default: 'null',
	},
	premium: {
		type: Boolean,
		default: false,
	},
	leveling: {
		type: Boolean,
		default: false,
	},
        language: {
		type: String,
		default: 'english'
	},
});

module.exports = mongoose.model('guildsDB', guildsDB);