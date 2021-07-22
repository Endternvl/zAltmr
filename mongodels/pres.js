const m = require('mongoose');

module.exports = m.model('presence', new m.Schema({
	guild: String,
	content: Object
}));