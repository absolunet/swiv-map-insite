module.exports = class InsiteMapperService {

    constructor() {
        const mappers = [
            require('./../mapper/action-field'),
            require('./../mapper/promotion'),
            require('./../mapper/product')
        ];

        this.mappers = {};

        mappers.forEach((Mapper) => {
            const mapper = new Mapper();
            this.mappers[mapper.getModelName()] = mapper;
        });
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
