const AbstractInsiteMapper = require('./abstract/mapper');
const ImpressionDataModel = require('swiv-core/src/gee/model/data/impression');

module.exports = class InsiteProductDataModelMapper extends AbstractInsiteMapper {

	getModel() {
		return new ImpressionDataModel();
	}

	getDataCollection(data) {
		return data.products || [data.product || data];
	}

};
