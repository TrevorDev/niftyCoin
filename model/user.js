var database = require('./../lib/database');
var sequelize = require('sequelize');
var si = database.getSequelizeInstance();

var User = si.define('User', 
	{
	  email: {
	  	type:sequelize.STRING(512),
	  	validate: {
	  		isEmail: true
	  	},
	  	unique: true
	  },
	  name: {
	  	type:sequelize.STRING,
	  	defaultValue: "guest"
	  },
	  password: sequelize.STRING,
	  guestId: {
	  	type: sequelize.STRING(512),
	  	unique: true
	  },
	  coins: {
	  	type: sequelize.BIGINT,
	  	defaultValue: 0
	  },
	  lastDailyBonusReceived: {
	  	type: sequelize.DATE,
	  	defaultValue: sequelize.NOW
	  }
	}, {
		classMethods: {

		},
		instanceMethods: {

		}
	}
)

module.exports = User;