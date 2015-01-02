var database = require('./../lib/database');
var sequelize = require('sequelize');
var si = database.getSequelizeInstance();

var Item = si.define('Item', 
	{
	  forSaleAmmount: {
	  	type: sequelize.BIGINT,
	  	defaultValue: 0
	  },
	  forSalePrice: {
	  	type: sequelize.BIGINT,
	  	defaultValue: 0
	  },
	  amountOwned: sequelize.BIGINT
	}, {
		classMethods: {

		},
		instanceMethods: {

		}
	}
)

module.exports = Item;