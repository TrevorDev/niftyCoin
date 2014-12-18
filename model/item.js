var database = require('./../lib/database');
var sequelize = require('sequelize');
var si = database.getSequelizeInstance();

var Item = si.define('Item', 
	{
	  forSale: {
	  	type: sequelize.BOOLEAN,
	  	defaultValue: true
	  },
	  price: {
	  	type: sequelize.BIGINT,
	  	defaultValue: 0
	  }
	}, {
		classMethods: {

		},
		instanceMethods: {

		}
	}
)

module.exports = Item;