const AbstractInsiteMapper = require('./abstract/mapper');
const ProductDataModel = require('swiv/src/gee/model/data/product');

module.exports = class InsiteProductDataModelMapper extends AbstractInsiteMapper {

	getModel() {
		return new ProductDataModel();
	}

	getDataCollection(data) {
		return data.products || [data.product || data];
	}

};
