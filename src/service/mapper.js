const ActionFieldDataModel = require('./../mapper/action-field');
const PromotionDataModelMapper = require('./../mapper/promotion');
const ProductDataModelMapper = require('./../mapper/product');

module.exports = class InsiteMapperService {

    constructor() {
        this.mappers = {
            'ProductDataModel': new ProductDataModelMapper(),
            'PromotionDataModel': new PromotionDataModelMapper(),
            'ActionFieldDataModel': new ActionFieldDataModel()
        };        
    }

    map(data, event) {
        const mapper = this.getDedicatedMapper(event.getMainDataType().name);

        if (mapper) {
            event.setMainData(mapper.map(data));
        }

        return event.getData();
    }

    getDedicatedMapper(event) {
        return this.mappers[event] || null;
    }
}
