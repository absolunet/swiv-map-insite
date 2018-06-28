const AbstractInsiteMapper = require('./abstract/mapper');
const ImpressionDataModel = require('swiv/src/gee/model/data/impression');

module.exports = class InsiteProductDataModelMapper extends AbstractInsiteMapper {

	getModel() {
		return new ImpressionDataModel();
	}

	getDataCollection(data) {
		return data.products || (data instanceof Array ? data : [data.product || data]);
	}

};
