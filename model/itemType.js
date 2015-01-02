var database = require('./../lib/database');
var sequelize = require('sequelize');
var si = database.getSequelizeInstance();

var CATAGORY = {STOCK: "STOCK", ITEM: "ITEM", LOAN: "LOAN", BET: "BET"}
var STATUS = {IN_PRODUCTION: "IN_PRODUCTION", DISCONTINUED: "DISCONTINUED", DELETED: "DELETED"}

var ItemType = si.define('ItemType', 
	{
	  name: sequelize.STRING,
	  catagory: {
	  	type:   sequelize.ENUM,
	    values: [CATAGORY.STOCK, CATAGORY.ITEM, CATAGORY.LOAN, CATAGORY.BET]
	  },
	  price: sequelize.BIGINT,
	  rarity: {
		type: sequelize.BIGINT,//LOWER == MORE RARE
		defaultValue: 10
	  },
	  status: {
	  	type:   sequelize.ENUM,
	    values: [STATUS.IN_PRODUCTION, STATUS.DISCONTINUED, STATUS.DELETED],
	    defaultValue: STATUS.IN_PRODUCTION
	  }
	}, {
		classMethods: {
			getCurrentStocks: function*(){
				var ret = yield ItemType.findAll({where:{status: STATUS.IN_PRODUCTION}});
				return ret;
			}
		},
		instanceMethods: {
			
		}
	}
)
ItemType.CATAGORY = CATAGORY;
ItemType.STATUS = STATUS;
module.exports = ItemType;