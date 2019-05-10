'use strict';
class QueryHandler{

	constructor(){
		this.Mongodb = require("./../config/db");
	}

	fetchCart(id, cartItems){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				if(cartItems !== null && cartItems.length) {					const count = await DB.collection('cart').find({accountID:id}).count();
					count > 0 ? 
						DB.collection('cart').update({accountID: id}, { $push: { cart: cartItems } }, {upsert: true}) :
						DB.collection('cart').insert({accountID: id, cart: cartItems }); 
				}
				DB.collection('cart').find({accountID: id}).toArray((err, data) => {
					if( err ){
						reject(err);
					}
					resolve(data[0]);
				});
			} catch (error) {
				reject(error)
			}	
		});
	}

	placeOrder(id, cartItems, totalPrice){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('orders').insert({accountID:id,orderInfo:cartItems, totalPrice: totalPrice}); 
				const response = {
					orderStatus: 'placed'
				};
				resolve(response);
			} catch (error) {
				reject(error)
			}	
		});
	}

	getOrders(id){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('orders').find({accountID: id}).sort({'_id': -1}).toArray((err, data) => {
					if( err ){
						reject(err);
					}
					var response = {
						orders: data
					}
					resolve(response);
				});
			} catch (error) {
				reject(error)
			}	
		});
	}

	orderDetails(userID, orderID){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();

				DB.collection('orders').find({accountID:userID, _id:ObjectID(orderID)}).toArray((err, result) => {
					if(err) {
						reject(err);
					} 
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}	
		});
	}



}

module.exports = new QueryHandler();
