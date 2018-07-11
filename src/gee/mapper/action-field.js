const AbstractInsiteMapper = require('./abstract/mapper');
const ActionFieldDataModel = require('swiv/src/gee/model/data/action-field');

module.exports = class InsiteActionFieldDataModelMapper extends AbstractInsiteMapper {

	getModel() {
		return new ActionFieldDataModel();
	}

	getMappedData(data) {
		return data;
	}

};
