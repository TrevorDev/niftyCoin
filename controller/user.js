var User = require('./../model/user');
var parse = require('co-body')

exports.getUsers = function*() {
	var users = yield User.findAll({})
	return this.jsonResp(200,{users: users});
}

exports.create = function*(){
	//var params = yield parse(this)
	// console.log(this.query)
	// console.log(this.params)
	console.log(this.request.body)
	yield User.create({guestId: this.request.body.guestId});
	return this.jsonResp(200);
}

exports.get = function*(){
	var user = yield User.find(this.params.id);
	var resp = user.dataValues
	delete resp.guestId
	delete resp.password
	delete resp.email
	return this.jsonResp(200, resp);
}