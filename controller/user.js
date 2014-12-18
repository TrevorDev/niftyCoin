var User = require('./../model/user');
var parse = require('co-body')

exports.getUsers = function*() {
	var users = yield User.findAll({})
	return this.jsonResp(200,{users: users});
}

exports.create = function*(){
	console.log("hit")
	//var params = yield parse(this)
	// console.log(this.query)
	// console.log(this.params)
	console.log(this.request.body)
	yield User.create({guestId: this.request.body.guestId});
	return this.jsonResp(200);
}