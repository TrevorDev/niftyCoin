var User = require('./../model/user');
var parse = require('co-body')

var database = require('./../lib/database');
var sequelize = require('sequelize');
var si = database.getSequelizeInstance();

exports.getUsers = function*() {
	var users = yield User.findAll({})
	return this.jsonResp(200,{users: users});
}

exports.create = function*(){
	//var params = yield parse(this)
	// console.log(this.query)
	// console.log(this.params)
	console.log(this.request.body)
	var bonus = 200;
	yield User.create({guestId: this.request.body.guestId, coins: bonus});
	return this.jsonResp(200, {bonus: bonus});
}

exports.get = function*(){
	var user = yield User.find(this.params.id);
	var resp = user.dataValues
	delete resp.guestId
	delete resp.password
	delete resp.email
	return this.jsonResp(200, resp);
}

exports.requestDailyBonus = function*(){
	var user = yield User.find(this.session.passport.user);
	var resp = user.dataValues
	console.log(resp)
	delete resp.guestId
	delete resp.password
	delete resp.email
	return this.jsonResp(200, resp);
}

exports.sendCoins = function*(){
	var toUser = yield User.find(this.params.id);
	if(!toUser){
		return this.jsonResp(40, "User to send to not found");
	}
	var amt = parseInt(this.request.body.coins);
	if(isNaN(amt) || amt <= 0){
		return this.jsonResp(400, "Invalid amount");
	}
	var rowCount = yield User.update({coins: sequelize.literal("coins - "+amt)}, {where: {id: this.session.passport.user,coins: {gte: amt}}})
	if(rowCount <= 0){
		return this.jsonResp(400, "Insufficiant coins");
	}
	yield toUser.increment({coins: amt})
	
	return this.jsonResp(200);
}