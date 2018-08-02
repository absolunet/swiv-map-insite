const ImpressionMapper = require('./impression');
const ProductDataModel = require('swiv/src/gee/model/data/product');

module.exports = class InsiteProductDataModelMapper extends ImpressionMapper {

	getModel() {
		return new ProductDataModel();
	}

	cleanQuantity() {
		// eslint-disable-line no-empty-function
	}

};
