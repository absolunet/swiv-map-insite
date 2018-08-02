const AbstractInsiteMapper = require('./abstract/mapper');
const ImpressionDataModel = require('swiv/src/gee/model/data/impression');

module.exports = class InsiteProductDataModelMapper extends AbstractInsiteMapper {

	getModel() {
		return new ImpressionDataModel();
	}

	getDataCollection(data) {
		if (data.main) {
			return data.main instanceof Array ? data.main : [data.main];
		}

		return data.products || (data instanceof Array ? data : [data.main || data.product || data]);
	}

	cleanDataModel(dataModel) {
		super.cleanDataModel(dataModel);
		this.cleanQuantity(dataModel);
		if (!dataModel.list) {
			delete dataModel.list;
		}
	}

	cleanQuantity(dataModel) {
		delete dataModel.quantity;
	}

};
