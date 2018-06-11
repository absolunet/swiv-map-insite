const AbstractInsiteMapper = require('./abstract/mapper');

module.exports = class InsiteProductDataModelMapper extends AbstractInsiteMapper {

    map(data) {
        return (data.products || [data.product || data]).map((productDto) => {
            return this.mapOne(productDto);
        });
    }

    mapOne(productDto, data = {}) {
        const product = {
            id: productDto.id,
            name: productDto.name,
            list: 'Detail Page',
            brand: productDto.properties.brand || '',
            category: productDto.properties.category || '',
            variant: '',
            position: 1,
            price: productDto.pricing.unitListPrice
        };

        Object.keys(data).forEach((k) => {
            product[k] = data[k];
        });

        return product;
    }
}
