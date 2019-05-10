'use strict';
class QueryHandler{

	constructor(){
		this.Mongodb = require("./../config/db");
	}

	async register(user){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				user.online = 'Y';
				DB.collection('account').insertOne(user, (err, result) => {
					resolve(result);
				});

			} catch (error) {
				reject(error)
			}	
		});
	}

	async account(email,password){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				const count = await DB.collection('account').find({email:email, password: password}).count();
				console.log(`Count is ${count}`);
				DB.collection('account').find({email:email, password: password}).toArray((err, data) => {
					if( err ){
						reject(err);
					} 
					console.log(data);
					resolve(data[0]);
				});
			} catch (error) {
				reject(error)
			}	
		});
	}

	async emailAvailable(email){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				const count = await DB.collection('account').find({email:email}).count();
				resolve(count);
			} catch (error) {
				reject(error)
			}	
		});
	}

	async profile(id){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('account').find({_id:ObjectID(id)}).toArray((err, data) => {
					if( err ){
						reject(err);
					}
					var response = {
						user: data,
					}
					resolve(response);
				});
			} catch (error) {
				reject(error)
			}	
		});
	}

	async editProfile(id, user){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('account').update({_id:ObjectID(id)}, { $set: user });
				const response = {
					updateStatus: true
				};
				resolve(response);
			} catch (error) {
				reject(error)
			}	
		});
	}

	userSessionCheck(data){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('account').findOne( { _id : ObjectID(data.currentUserID) , online : 'Y'}, (err, result) => {
					if( err ){
						reject(err);
					}
					resolve(result);
				});	
			} catch (error) {
				reject(error)
			}
		});
	}

	makeUserOnline(userId){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('account').update({
					_id : ObjectID(userId)
				},{ "$set": {'online': 'Y'} },{new: true, upsert: true}, (err, result) => {
					if( err ){
						reject(err);
					}
					resolve(result.value);
				});
			} catch (error) {
				reject(error)
			}	
		});
	}

	logout(userId){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('account').update({
					_id : ObjectID(userId)
				},{ "$set": {'online': 'N'} },{new: true, upsert: true}, (err, result) => {
					if( err ){
						reject(err);
					}
					resolve(result.value);
				});
			} catch (error) {
				reject(error)
			}	
		});
	}

}

module.exports = new QueryHandler();
