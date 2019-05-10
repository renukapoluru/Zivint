"use strict";
/*requiring mongodb node modules */
const mongodb = require('mongodb');
const assert = require('assert');

class Db{

	constructor(){
		this.mongoClient = mongodb.MongoClient;
		this.ObjectID = mongodb.ObjectID;
	}

	onConnect(){
		const mongoURL = process.env.DB_URL;
		return new Promise( (resolve, reject) => {
			this.mongoClient.connect(mongoURL, { useNewUrlParser: true },(err, client) => {
				if (err) {
					reject(err);
				} else {
					const db = client.db('Zivint');
					assert.equal(null, err);
					resolve([db,this.ObjectID]);
				}
			});
		});
	}
}
module.exports = new Db();