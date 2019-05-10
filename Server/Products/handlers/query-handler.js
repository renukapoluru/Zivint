'use strict';
class QueryHandler{

	constructor(){
		this.Mongodb = require("./../config/db");
	}

	searchProduct(searchterm){
		let filter = {
			"product_name": { $regex : new RegExp(searchterm, "i") },
		};
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('products').find(filter).limit(5).toArray((err, result) => {
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

	products(filters,sortFilter,query,productsPerPage){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('products').find(filters).sort(sortFilter).limit(10000).count((err, results) => {
					if(err){
						reject(err);
					}
					const totalCount = results;
					DB.collection('products').find(filters,query).sort(sortFilter).toArray((err, data) => {
						if( err ){
							reject(err);
						}
						var response = {
							totalCount: totalCount,
							products: data
						}
						resolve(response);
					});
				})
			} catch (error) {
				reject(error)
			}	
		});
	}

	filterData(){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				let filterData = {};
				DB.collection('products').distinct('product_category_tree', (err, categories) => {
					if(err) {
						reject(err);
					} else {
						filterData.categories = categories;
					}
				});
				DB.collection('products').distinct('brand', (err, brands) => {
					if(err) {
						reject(err);
					} else {
						filterData.brands = brands;
						resolve(filterData);
					}
				});
			} catch (error) {
				reject(error)
			}	
		});
	}

	productDetails(id){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();

				DB.collection('products').find(ObjectID(id)).toArray((err, result) => {
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
