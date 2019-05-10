const queryHandler = require('./../handlers/query-handler');
const CONSTANTS = require('./../config/constants');

'use strict';
class RouteHandler{

	constructor(){}

	async searchProductHandler(request, response){
		let searchText = request.params.searchterm; 	
		if (searchText === '') {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error : true,
				message : CONSTANTS.ROUTE_NOT_FOUND
			});
		}else{
			try {
				const messagesResponse = await queryHandler.searchProduct(searchText);
				response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
					error : false,
					searchResults : messagesResponse
				});
			} catch ( error ){
				console.log(error);
				response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
					error : true,
					messages : CONSTANTS.SERVER_ERROR_MESSAGE
				});
			}
		}
	}

	async productsHandler(request, response){
		let search = request.body.search;
		let categories = request.body.categories;
		let brands = request.body.brands;
		let pageNo = request.params.pageNo;
		let sortbyPrice = request.body.sortbyPrice;
		let query = {}; 
		let productsPerPage = 21;
		query.skip = productsPerPage * (pageNo - 1)
		query.limit = productsPerPage;
		let filters = {};
		let sortFilter = {}
		console.log(sortFilter);
		if(sortbyPrice !== undefined){
			sortFilter.retail_price = sortbyPrice;
		}
		if(search !== 'NoSearch') {
			filters.product_name = { $regex : new RegExp(search, "i") };
		}
		if(categories.length > 0){
			filters.product_category_tree = { $in: categories };
		}
		if(brands.length > 0){
			filters.brand = { $in: brands };
		}
		console.log(filters,sortFilter,query);
		if (pageNo === 0 || pageNo < 0) {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error : true,
				message : CONSTANTS.ROUTE_NOT_FOUND,
				Products: [],
				TotalCount: 0
			});
		} else {
			try {
				const messagesResponse = await queryHandler.products(filters,sortFilter,query,productsPerPage);
				response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
					error : false,
					Products : messagesResponse.products,
					TotalCount: messagesResponse.totalCount
				});
			} catch ( error ){
				console.log(error);
				response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
					error : true,
					Products : [],
					TotalCount: 0
				});
			}
		}
	}

	async filterDataHandler(request, response){
		try {
			const messagesResponse = await queryHandler.filterData();
			response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
				error : false,
				message: 'Ok',
				brands : messagesResponse.brands,
				categories: messagesResponse.categories
			});
		} catch ( error ){
			console.log(error);
			response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
				error : true,
				message: CONSTANTS.SERVER_ERROR_MESSAGE,
				brands : [],
				categories: []
			});
		}
	}

	async productDetailsHandler(request, response){
		let productID = request.params.id;
		try {
			const messagesResponse = await queryHandler.productDetails(productID);
			response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
				error : false,
				message: 'Ok',
				productDetails : messagesResponse,
			});
		} catch ( error ){
			console.log(error);
			response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
				error : true,
				message:CONSTANTS.SERVER_ERROR_MESSAGE,
				productDetails: messagesResponse,
			});
		}
	}

	routeNotFoundHandler(request, response){
		response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
			error : true,
			message : CONSTANTS.ROUTE_NOT_FOUND
		});
	}
}

module.exports = new RouteHandler();
