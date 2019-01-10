const AbstractInsiteMapper = require('./abstract/mapper');
const PromotionDataModel = require('swiv/src/gee/model/data/promotion');

module.exports = class InsitePromotionDataModelMapper extends AbstractInsiteMapper {

	getModel() {
		return new PromotionDataModel();
	}

	getDataCollection(data) {
		if (data.main) {
			return data.main instanceof Array ? data.main : [data.main];
		}

		return data instanceof Array ? data : [data];
	}

};
