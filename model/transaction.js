var database = require('./../lib/database');
var sequelize = require('sequelize');
var si = database.getSequelizeInstance();

var Transaction = si.define('Transaction', 
	{
	  price: sequelize.BIGINT
	}, {
		classMethods: {

		},
		instanceMethods: {

		}
	}
)

module.exports = Transaction;