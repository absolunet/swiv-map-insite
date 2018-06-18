const AbstractInsiteMapper = require('./abstract/mapper');
const PromotionDataModel = require('swiv/src/gee/model/data/promotion');

module.exports = class InsitePromotionDataModelMapper extends AbstractInsiteMapper {

	getModel() {
		return new PromotionDataModel();
	}

};
