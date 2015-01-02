var ItemType = require('./../model/itemType');
var parse = require('co-body')

var database = require('./../lib/database');
var sequelize = require('sequelize');
var si = database.getSequelizeInstance();

exports.create = function*() {
	yield ItemType.create({
		name: "Ace corp",
		catagory: ItemType.CATAGORY.STOCK,
		price: 300
	});
	yield ItemType.create({
		name: "Green co",
		catagory: ItemType.CATAGORY.STOCK,
		price: 50
	});
	yield ItemType.create({
		name: "Slab inc",
		catagory: ItemType.CATAGORY.STOCK,
		price: 30
	});
	yield ItemType.create({
		name: "Tiny Stomp",
		catagory: ItemType.CATAGORY.STOCK,
		price: 90
	});
	yield ItemType.create({
		name: "Gold Man Saxiphones",
		catagory: ItemType.CATAGORY.STOCK,
		price: 90
	});
	return this.jsonResp(200,{stocks: 1});
}

exports.get = function*() {
	var stocks = yield ItemType.getCurrentStocks();
	return this.jsonResp(200,stocks);
}