var database = require('./../lib/database');
var sequelize = require('sequelize');
var si = database.getSequelizeInstance();

var ItemType = si.define('ItemType', 
	{
	  name: sequelize.STRING
	}, {
		classMethods: {

		},
		instanceMethods: {

		}
	}
)

module.exports = ItemType;