var sequelize = require("sequelize");
var config  = require('./config');

var si = new sequelize(config.database.database, config.database.user, config.database.password, {
	//logging: false,
	host: config.database.host
})

exports.getSequelizeInstance = function(){
	return si;
}

function heartBeat() {
	si.query('SELECT 1')
	setTimeout(heartBeat, 300000) //5 min
}

heartBeat()

var user = require("../model/user");
var itemType = require("../model/itemType");
var item = require("../model/item");
var transaction = require("../model/transaction");

user.hasMany(item)
item.belongsTo(user)

itemType.hasMany(item)
item.belongsTo(itemType)

transaction.hasMany(item)
item.hasMany(transaction)