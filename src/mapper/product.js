const AbstractInsiteMapper = require('./abstract/mapper');

module.exports = class InsiteProductDataModelMapper extends AbstractInsiteMapper {

    map(data) {
        return {
            id: data.id,
            name: data.name,
            list: 'Detail Page',
            brand: data.properties.brand || '',
            category: data.properties.category || '',
            variant: '',
            position: 1,
            price: data.pricing.unitListPrice
        };
    }
}
